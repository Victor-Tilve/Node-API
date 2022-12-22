import { HttpResponse } from '../../../interfaces/http-interface'

/* Defining the interface for the data layer. */
export interface ILogoutUserData {
  logoutUser: (token: string) => Promise<HttpResponse>
}
