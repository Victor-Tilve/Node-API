import { IatiDatastoreApiRepository } from '../domain/repositories/IatiDatastoreApi-repository'
// import { IIatiDatastoreApiDocs, IQueryParams, MonetaryAidResponse } from '../interfaces/transaction-interface'
import { IIatiDatastoreApiResponse, IQueryParams, MonetaryAidResponse } from '../interfaces/transaction-interface'
import { redisClient } from '../infra/caching/redis/redis-connect'
export class IatiDatastoreApiService {
  iatiDatastoreApiRepository: IatiDatastoreApiRepository
  // FIXME: implement dependency injection. in this way I can not depend on an interface but a class
  constructor () {
    this.iatiDatastoreApiRepository = new IatiDatastoreApiRepository()
  }

  async getData (params: IQueryParams): Promise<MonetaryAidResponse> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, prefer-const
    let monetaryAidResponse: MonetaryAidResponse
    let dataResponse: IIatiDatastoreApiResponse
    // FIXME: change redisClient const name
    const client = await redisClient()
    try {
      const countryCode = params.q.replace('recipient_country_code:', '')
      // FIXME: use cache key as countryCode+start. thinking ahead of multiples calls
      // FIXME: Other solution is to store the final object and then access to it using chache just with the countryCode.
      const cacheResults = await client.get(countryCode)
      if (cacheResults !== undefined && cacheResults != null && Object.keys(cacheResults).length !== 0) {
        monetaryAidResponse = JSON.parse(cacheResults)
      } else {
        // FIXME: for more than one iteration
        dataResponse = await this.iatiDatastoreApiRepository.fetchData(params)
        monetaryAidResponse = this.processData(dataResponse)
        await client.set(countryCode, JSON.stringify(monetaryAidResponse))
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
        // FIXME: providerOrg !== undefined is checked twice
        if (year !== undefined && transactionValue !== undefined) {
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
