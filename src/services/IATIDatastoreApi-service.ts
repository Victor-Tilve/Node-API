import { IatiDatastoreApiRepository } from '../domain/repositories/IatiDatastoreApi-repository'
// import { IIatiDatastoreApiDocs, IQueryParams, MonetaryAidResponse } from '../interfaces/transaction-interface'
import { IQueryParams, MonetaryAidResponse } from '../interfaces/transaction-interface'

export class IatiDatastoreApiService {
  iatiDatastoreApiRepository: IatiDatastoreApiRepository
  constructor () {
    this.iatiDatastoreApiRepository = new IatiDatastoreApiRepository()
  }

  async getData (params: IQueryParams): Promise<MonetaryAidResponse> {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, prefer-const
    let monetaryAidResponse: MonetaryAidResponse = {}
    const dataResponse = await this.iatiDatastoreApiRepository.fetchData(params)
    console.log('IatiDatastoreApiService::getData::dataResponse.response.numFound: ' + String(dataResponse.response?.numFound))

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
