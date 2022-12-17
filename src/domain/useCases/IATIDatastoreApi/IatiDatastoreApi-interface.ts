import { MonetaryAidResponse } from '../../../interfaces/transaction-interface'

export interface IIatiDatastoreApiData {
  getMonetaryAid: (countryCode: string) => Promise<MonetaryAidResponse>
}
