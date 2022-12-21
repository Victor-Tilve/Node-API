import { HttpResponse } from '../../../interfaces/http-interface'
import { IBaseUserInput } from '../../../interfaces/user-interface'

export interface ICreateUser {
  createUser: (newUser: IBaseUserInput) => Promise<HttpResponse>
}
