import { HttpResponse } from '../../../interfaces/http-interface'
import { ILoginUserInput } from '../../../interfaces/user-interface'

/* Defining the interface for the data layer. */
export interface ILoginUserData {
  loginUser: (user: ILoginUserInput) => Promise<HttpResponse>
}
