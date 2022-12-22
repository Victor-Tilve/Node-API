import { HttpResponse } from '../../../interfaces/http-interface'
import { IBaseUserInput } from '../../../interfaces/user-interface'

/* Defining the interface for the data layer. */
export interface ICreateUserData {
  createUser: (newUser: IBaseUserInput) => Promise<HttpResponse>
}
