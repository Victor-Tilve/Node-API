import { HttpResponse } from '../../../interfaces/http-interface'
import { IRefreshTokenInput } from '../../../interfaces/user-interface'

/* Defining the interface for the data layer. */
export interface IRefreshTokenData {
  refreshToken: (refreshToken: IRefreshTokenInput) => Promise<HttpResponse>
}
