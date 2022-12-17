// import axios, { AxiosResponse } from 'axios'
import axios from 'axios'
import { IQueryParams } from '../../interfaces/transaction-interface'

export class IatiDatastoreApiRepository {
  // COMEBACK: Fix any issue
  async fetchData (params: IQueryParams): Promise<any> {
    console.log('IatiDatastoreApiRepository::fetchData: Inside')
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
      console.log('IatiDatastoreApiRepository::fetchData: Before axios response')
      apiResponse = await axios.get(url, {
        headers: {
          'Ocp-Apim-Subscription-Key': '9a996c5839f947bd985e124be48fc6d9',
          'Accept-Encoding': 'gzip,deflate,compress'
        }
      })
    } catch (error) {
      console.log('error:' + String(error))
      apiResponse.data = undefined
    }
    console.log('IatiDatastoreApiRepository::fetchData:Request sent to the API')
    return apiResponse.data
  }
}
