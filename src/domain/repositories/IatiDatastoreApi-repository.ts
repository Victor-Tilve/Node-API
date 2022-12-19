// import axios, { AxiosResponse } from 'axios'
import axios from 'axios'
import { IIatiDatastoreApiResponse, IQueryParams } from '../../interfaces/transaction-interface'
// FIXME: Create an interface for this repository. Making service depending on the interface
export class IatiDatastoreApiRepository {
  // FIXME: Refatoring: fetchDataTransaction
  async fetchData (params: IQueryParams): Promise<IIatiDatastoreApiResponse> {
    ('IatiDatastoreApiRepository::fetchData: Inside')
    const url = `https://api.iatistandard.org/datastore/${params.collection}/select?
    q=${params.q}&
    fl=${params.fl}&
    df=${params.df}&
    fq=${params.fq}&
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
