import { IatiDatastoreApiRepository } from '../domain/repositories/IatiDatastoreApi-repository'
// import { IIatiDatastoreApiDocs, IQueryParams, MonetaryAidResponse } from '../interfaces/transaction-interface'
import { IIatiDatastoreApiResponse, IQueryParams, MonetaryAidResponse } from '../interfaces/transaction-interface'
import { redisClient } from '../infra/caching/redis/redis-connect'
import { currencyConversion } from '../helpers/rateConversion-helper'

/**
 *
 */
export class IatiDatastoreApiService {
  iatiDatastoreApiRepository: IatiDatastoreApiRepository
  // FIXME: implement dependency injection. in this way I can not depend on an interface but a class
  constructor () {
    this.iatiDatastoreApiRepository = new IatiDatastoreApiRepository()
  }

  /**
   *
   * @param params
   * @returns
  */
  async getData (params: IQueryParams): Promise<MonetaryAidResponse> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, prefer-const
    let monetaryAidResponse = {} as MonetaryAidResponse
    let dataResponse: IIatiDatastoreApiResponse
    // FIXME: change redisClient const name
    const client = await redisClient()
    try {
      const countryCode = params.q.replace('recipient_country_code:', '')
      const cacheResults = await client.get(countryCode)
      if (cacheResults !== undefined && cacheResults != null && Object.keys(cacheResults).length !== 0) {
        monetaryAidResponse = JSON.parse(cacheResults)
      } else {
        const rows = Number(params.rows)
        let start = Number(params.start)
        let numFound = start + 1
        while (numFound > start) {
          params.start = String(start)
          dataResponse = await this.iatiDatastoreApiRepository.fetchData(params)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
          numFound = dataResponse.response?.numFound!
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
          start = dataResponse.response?.start! + rows
          const temp = this.processData(dataResponse)
          monetaryAidResponse = this.gatherData(monetaryAidResponse, temp)
        }
        await client.set(countryCode, JSON.stringify(monetaryAidResponse))
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      console.log('IatiDatastoreApiService::getData: error: ' + JSON.stringify(error))
      monetaryAidResponse = {}
    }

    return monetaryAidResponse
  }

  /**
   *
   * @param dataResponse
   * @returns MonetaryAidResponse
  */
  private processData (dataResponse: IIatiDatastoreApiResponse): MonetaryAidResponse {
    const monetaryAidResponse: MonetaryAidResponse = {}
    const docs = dataResponse.response?.docs
    let transactionValueUSD: number | undefined
    if (docs) {
      for (let index = 0; index < docs.length; index++) {
        const date = docs[index].transaction_value_value_date ?? undefined
        const year = date !== undefined ? new Date(date[0]).getFullYear() : undefined
        const providerOrg = docs[index].transaction_provider_org_narrative?.[0] ?? undefined
        const transactionValue = docs[index].transaction_value?.[0] ?? undefined
        const currency = docs[index].transaction_value_currency?.[0] ?? undefined
        if (currency !== undefined && transactionValue !== undefined) {
          transactionValueUSD = currencyConversion(currency, Number(transactionValue))
        }

        // FIXME: CURRENT CONVERSION: I'll make this conversion without taking into account the year of the transaction
        if (year !== undefined && transactionValueUSD !== undefined) {
          if (providerOrg !== undefined) {
            if (monetaryAidResponse[year]?.[providerOrg] !== undefined) {
              monetaryAidResponse[year][providerOrg] = Number(monetaryAidResponse[year][providerOrg]) + Number(transactionValueUSD)
            } else {
              monetaryAidResponse[year] = { ...monetaryAidResponse[year], [providerOrg]: Number(transactionValueUSD) }
            }
          }
        }
      }
    }
    return monetaryAidResponse
  }

  /**
 *
 * @param monetaryAidResponse
 * @param tempMonetaryAidResponse
 * @returns monetaryAidResponse updated
 * the number of transaction depend on the country. A number of rows per request is set, this number might be bigger or smaller than numFound, which is the total
 * of transaction that exist for that specific country. So there might be a situation where the number of rows < numFound and where it is necessary to make more than
 * one request to get all the transactions included in the answer. Due to that, this function is created, for gathering the information of the previews formatter object (monetaryAidResponse) with
 * last request (tempMonetaryAidResponse).
 */
  private gatherData (monetaryAidResponse: MonetaryAidResponse, tempMonetaryAidResponse: MonetaryAidResponse): MonetaryAidResponse {
    const monetaryAidResponseKeys = Object.keys(monetaryAidResponse)
    const tempMonetaryAidResponseKeys = Object.keys(tempMonetaryAidResponse)

    /**
     * Going all over the tempMonetaryAidResponseKeys, checking if already exist in monetaryAidResponse
     */
    for (let index = 0; index < tempMonetaryAidResponseKeys.length; index++) {
      const year = tempMonetaryAidResponseKeys[index]
      if (!monetaryAidResponseKeys.includes(year)) {
        monetaryAidResponse[year] = { ...tempMonetaryAidResponse[year] }
      } else {
        const tempMonetaryAidOrgsKeys = Object.keys(tempMonetaryAidResponse[year])
        /**
         * Going all over the tempMonetaryAidOrgsKeys, checking if already exist in monetaryAidResponse for that specific year
         */
        for (let index = 0; index < tempMonetaryAidOrgsKeys.length; index++) {
          const providerOrg = tempMonetaryAidOrgsKeys[index]
          const transactionValue = tempMonetaryAidResponse[year][providerOrg]
          if (monetaryAidResponse[year]?.[providerOrg] !== undefined) {
            monetaryAidResponse[year][providerOrg] = Number(monetaryAidResponse[year][providerOrg]) + Number(transactionValue)
          } else {
            monetaryAidResponse[year] = { ...monetaryAidResponse[year], [providerOrg]: Number(transactionValue) }
          }
        }
      }
    }
    return monetaryAidResponse
  }
}
