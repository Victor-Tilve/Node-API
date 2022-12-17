import { IatiDatastoreApiRepository } from '../domain/repositories/IatiDatastoreApi-repository'
// import { IIatiDatastoreApiDocs, IQueryParams, MonetaryAidResponse } from '../interfaces/transaction-interface'
import { IQueryParams, MonetaryAidResponse } from '../interfaces/transaction-interface'

export class IatiDatastoreApiService {
  iatiDatastoreApiRepository: IatiDatastoreApiRepository
  constructor () {
    this.iatiDatastoreApiRepository = new IatiDatastoreApiRepository()
  }

  async getData (params: IQueryParams): Promise<MonetaryAidResponse> {
    console.log('IatiDatastoreApiService::getData: inside')
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    let _monetaryAidResponse = {} as MonetaryAidResponse
    _monetaryAidResponse = {
      2011: {
        Sida: 181469583
      },
      2010: {
        Sida: 149667518,
        UD: 6105000
      },
      2009: {
        Sida: 122295311,
        UD: 30291000
      },
      2008: {
        Sida: 128969145,
        UD: 33851000,
        'Folke Bernadotte Academy': 173000,
        'Svenska institutet': 125000
      },
      2007: {
        Sida: 101561481,
        UD: 7399000,
        'Folke Bernadotte Academy': 6000
      }
    }
    const dataResponse = await this.iatiDatastoreApiRepository.fetchData(params)
    console.log('iatiDatastoreApi::getMonetaryAid::dataResponse: ' + JSON.stringify(dataResponse))
    return _monetaryAidResponse
  }
}
