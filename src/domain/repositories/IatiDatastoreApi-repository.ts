// import axios, { AxiosResponse } from 'axios'
import axios from 'axios'
import { IIatiDatastoreApiRepository, IIatiDatastoreApiResponse, IQueryParams } from '../../interfaces/IatiDatastoreApi-interface'

/* It fetches data from the IATI Datastore API, and returns the response as an object */
export class IatiDatastoreApiRepository implements IIatiDatastoreApiRepository {
/**
 * It fetches data from the IATI Datastore API, and returns the response as an object
 * @param {IQueryParams} params - IQueryParams
 * @returns an object of type IIatiDatastoreApiResponse.
 */
  async fetchDataTransactionLast5Years (params: IQueryParams): Promise<IIatiDatastoreApiResponse> {
    const yearsAgo = 5
    const now = new Date().toISOString()
    const dateYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - yearsAgo)).toISOString()
    const url = `https://api.iatistandard.org/datastore/transaction/select?
    q=${params.q}&
    fl=transaction_value,transaction_value_currency,transaction_value_value_date,transaction_provider_org_narrative&
    df=recipient_country_code&
    fq=transaction_value_value_date:[${dateYearsAgo} TO ${now}]&
    rows=${params.rows}&
    start=${params.start}`
    // Deleting newLine characters
    url.replace('\n', '')
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    let apiResponse: any
    try {
      apiResponse = await axios.get(url, {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.PRIMARYKEY,
          'Accept-Encoding': 'gzip,deflate,compress'
        }
      })
    } catch (error) {
      console.log('error:' + String(error))
      apiResponse.data = undefined
    }
    return apiResponse.data as IIatiDatastoreApiResponse
  }
}
