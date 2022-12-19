import { IatiDatastoreApiRepository } from '../domain/repositories/IatiDatastoreApi-repository'
// import { IIatiDatastoreApiDocs, IQueryParams, MonetaryAidResponse } from '../interfaces/transaction-interface'
import { IIatiDatastoreApiResponse, IQueryParams, MonetaryAidResponse } from '../interfaces/transaction-interface'
import * as redis from 'redis'
// FIXME: config the time of the caching
let redisClient
void (async () => {
  redisClient = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT)
    },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    url: process.env.REDIS_URL
  })
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  redisClient.on('error', (error) => console.error(`Error : ${error}`))
  await redisClient.connect()
})()

export class IatiDatastoreApiService {
  iatiDatastoreApiRepository: IatiDatastoreApiRepository
  constructor () {
    this.iatiDatastoreApiRepository = new IatiDatastoreApiRepository()
  }

  async getData (params: IQueryParams): Promise<MonetaryAidResponse> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, prefer-const
    let monetaryAidResponse: MonetaryAidResponse
    let dataResponse: IIatiDatastoreApiResponse
    try {
      const countryCode = params.q.replace('recipient_country_code:', '')
      const cacheResults = await redisClient.get(countryCode)
      if (cacheResults !== undefined && cacheResults != null && Object.keys(cacheResults).length !== 0) {
        monetaryAidResponse = JSON.parse(cacheResults)
      } else {
        dataResponse = await this.iatiDatastoreApiRepository.fetchData(params)
        monetaryAidResponse = this.processData(dataResponse)
        await redisClient.set(countryCode, JSON.stringify(monetaryAidResponse))
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      console.log('IatiDatastoreApiService::getData: error: ' + JSON.stringify(error))
      monetaryAidResponse = {}
    }

    return monetaryAidResponse
  }

  private processData (dataResponse: IIatiDatastoreApiResponse): MonetaryAidResponse {
    const monetaryAidResponse: MonetaryAidResponse = {}

    const docs = dataResponse.response?.docs
    if (docs) {
      for (let index = 0; index < docs.length; index++) {
        const date = docs[index].transaction_value_value_date ?? undefined
        const year = date !== undefined ? new Date(date[0]).getFullYear() : undefined
        const providerOrg = docs[index].transaction_provider_org_narrative?.[0] ?? undefined
        const transactionValue = docs[index].transaction_value?.[0] ?? undefined

        // FIXME: I need to make the currency conversion
        if (year !== undefined && providerOrg !== undefined && transactionValue !== undefined) {
          if (providerOrg !== undefined) {
            if (monetaryAidResponse[year]?.[providerOrg] !== undefined) {
              monetaryAidResponse[year][providerOrg] = Number(monetaryAidResponse[year][providerOrg]) + Number(transactionValue)
            } else {
              // COMEBACK: Check if there is a better way
              monetaryAidResponse[year] = { ...monetaryAidResponse[year], [providerOrg]: Number(transactionValue) }
            }
          }
        }
      }
    }
    return monetaryAidResponse
  }
}
