import { IIatiDatastoreApiData } from '../../../domain/useCases/IATIDatastoreApi/IatiDatastoreApi-interface'
import { IQueryParams, MonetaryAidResponse } from '../../../interfaces/transaction-interface'
// import { IQueryParams, MonetaryAidResponse } from '../../../interfaces/transaction-interface'
import { IatiDatastoreApiService } from '../../../services/IATIDatastoreApi-service'

export class IatiDatastoreApiData implements IIatiDatastoreApiData {
  iatiDatastoreApiService: IatiDatastoreApiService
  constructor () {
    this.iatiDatastoreApiService = new IatiDatastoreApiService()
  }

  async getMonetaryAid (countryCode: string): Promise<MonetaryAidResponse> {
    console.log('IatiDatastoreApiData::getMonetaryAid: inside')
    const numOfRows: number = 1000
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const params: IQueryParams = {
      collection: 'transaction',
      q: 'recipient_country_code:SD',
      df: 'recipient_country_code',
      start: '0',
      rows: String(numOfRows),
      fq: 'transaction_value_value_date:[2019-12-31T00:00:00Z TO NOW]', // FIXME: remember, 5 years
      fl: 'transaction_value,transaction_value_currency,transaction_value_value_date,transaction_provider_org_narrative'
    }
    const dataResponse = await this.iatiDatastoreApiService.getData(params)
    console.log('IatiDatastoreApiData::getMonetaryAid::dataResponse: ' + JSON.stringify(dataResponse))
    // FIXME: Process data. Respect dataResponse

    // console.log('iatiDatastoreApi::getMonetaryAid::monetaryAidResponse: ' + JSON.stringify(monetaryAidResponse))
    return dataResponse
  }
}
