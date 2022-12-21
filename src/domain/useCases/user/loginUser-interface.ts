import { HttpResponse } from '../../../interfaces/http-interface'
import { ILoginUserInput } from '../../../interfaces/user-interface'

export interface ILoginUser {
  loginUser: (user: ILoginUserInput) => Promise<HttpResponse>
}
