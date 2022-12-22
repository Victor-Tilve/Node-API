import { IatiDatastoreApiRepository } from '../domain/repositories/IatiDatastoreApi-repository'
import { IIatiDatastoreApiRepository, IIatiDatastoreApiResponse, IQueryParams, MonetaryAidResponse } from '../interfaces/IatiDatastoreApi-interface'
import { redisCreateClient } from '../infra/caching/redis/redis-connect'
import { currencyConversion } from '../helpers/rateConversion-helper'

export class IatiDatastoreApiService {
  iatiDatastoreApiRepository: IatiDatastoreApiRepository
  constructor (iatiDatastoreApiRepository: IIatiDatastoreApiRepository) {
    this.iatiDatastoreApiRepository = iatiDatastoreApiRepository
  }

  /**
 * It fetches data from the IATI Datastore API, processes it, and returns the processed data
 * @param {IQueryParams} params - IQueryParams
 * @returns a MonetaryAidResponse object.
 */
  async getData (params: IQueryParams): Promise<MonetaryAidResponse> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, prefer-const
    let monetaryAidResponse = {} as MonetaryAidResponse
    let dataResponse: IIatiDatastoreApiResponse
    const redisClient = await redisCreateClient()
    /* Checking if the data is already in the cache, if it is, it will return the data from the cache, if
    it isn't, it will fetch the data from the API, process it, and return it. */
    try {
      const countryCode = params.q.replace('recipient_country_code:', '')
      const cacheResults = await redisClient.get(countryCode)
      if (cacheResults !== undefined && cacheResults != null && Object.keys(cacheResults).length !== 0) {
        monetaryAidResponse = JSON.parse(cacheResults)
      } else {
        const rows = Number(params.rows)
        let start = Number(params.start)
        let numFound = start + 1
        while (numFound > start) {
          params.start = String(start)
          dataResponse = await this.iatiDatastoreApiRepository.fetchDataTransactionLast5Years(params)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
          numFound = dataResponse.response?.numFound!
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-non-null-asserted-optional-chain
          start = dataResponse.response?.start! + rows
          const temp = this.processData(dataResponse)
          monetaryAidResponse = this.gatherData(monetaryAidResponse, temp)
        }
        await redisClient.set(countryCode, JSON.stringify(monetaryAidResponse))
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      console.log('IatiDatastoreApiService::getData: error: ' + JSON.stringify(error))
      monetaryAidResponse = {}
    }

    return monetaryAidResponse
  }

  /**
 * It takes the response from the IATI Datastore API and returns an object with the monetary aid
 * received by the country in each year
 * @param {IIatiDatastoreApiResponse} dataResponse - IIatiDatastoreApiResponse
 * @returns an object with the following structure:
 * ```
 * {
 *   year: {
 *     providerOrg: value
 *   }
 * }
 * ```
 */
  private processData (dataResponse: IIatiDatastoreApiResponse): MonetaryAidResponse {
    const monetaryAidResponse: MonetaryAidResponse = {}
    const docs = dataResponse.response?.docs
    let transactionValueUSD: number | undefined
    /* Going through the response from the API call, and it is creating an object with the monetary aid
    received by the country in each year. */
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

        // NOTE: CURRENT CONVERSION: I'll make this conversion without taking into account the year of the transaction but Mon, 19 Dec 2022 23:55:01 GMT
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
 * It takes two objects, and merges them together, adding the values of the same keys
 * @param {MonetaryAidResponse} monetaryAidResponse - The object that will be returned
 * @param {MonetaryAidResponse} tempMonetaryAidResponse - The response from the API call
 * @returns a MonetaryAidResponse object.
 */
  private gatherData (monetaryAidResponse: MonetaryAidResponse, tempMonetaryAidResponse: MonetaryAidResponse): MonetaryAidResponse {
    const monetaryAidResponseKeys = Object.keys(monetaryAidResponse)
    const tempMonetaryAidResponseKeys = Object.keys(tempMonetaryAidResponse)

    /* Checking if the year already exists in the monetaryAidResponse, if it does, it will check if the
    providerOrg already exists, if it does, it will add the transactionValue to the existing one, if it
    doesn't, it will add the providerOrg and the transactionValue to the year. If the year doesn't
    exist, it will add the year and the providerOrg and the transactionValue. */
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
