import { MonetaryAidResponse } from '../../../interfaces/IatiDatastoreApi-interface'

/* Defining the interface for the data layer. */
export interface IIatiDatastoreApiData {
  getMonetaryAidLast5Years: (countryCode: string) => Promise<MonetaryAidResponse>
}
