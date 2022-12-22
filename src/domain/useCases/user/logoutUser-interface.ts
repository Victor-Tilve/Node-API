import { HttpResponse } from '../../../interfaces/http-interface'

export interface ILogoutUser {
  logoutUser: (token: string) => Promise<HttpResponse>
}
