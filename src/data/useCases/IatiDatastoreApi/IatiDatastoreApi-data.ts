import { IIatiDatastoreApiData } from '../../../domain/useCases/IATIDatastoreApi/IatiDatastoreApi-interface'
import { IIatiDatastoreApiRepository, IQueryParams, MonetaryAidResponse } from '../../../interfaces/IatiDatastoreApi-interface'
// import { IQueryParams, MonetaryAidResponse } from '../../../interfaces/transaction-interface'
import { IatiDatastoreApiService } from '../../../services/IATIDatastoreApi-service'

export class IatiDatastoreApiData implements IIatiDatastoreApiData {
  iatiDatastoreApiService: IatiDatastoreApiService
  constructor (iatiDatastoreApiRepository: IIatiDatastoreApiRepository) {
    this.iatiDatastoreApiService = new IatiDatastoreApiService(iatiDatastoreApiRepository)
  }

  async getMonetaryAidLast5Years (countryCode: string): Promise<MonetaryAidResponse> {
    const numOfRows: number = 100000
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    const params: IQueryParams = {
      q: `recipient_country_code:${countryCode}`,
      start: '0',
      rows: String(numOfRows)
    }
    const dataResponse = await this.iatiDatastoreApiService.getData(params)

    return dataResponse
  }
}
