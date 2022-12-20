import { MonetaryAidResponse } from '../../../interfaces/IatiDatastoreApi-interface'

export interface IIatiDatastoreApiData {
  getMonetaryAidLast5Years: (countryCode: string) => Promise<MonetaryAidResponse>
}
