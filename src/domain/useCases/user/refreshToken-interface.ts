import { HttpResponse } from '../../../interfaces/http-interface'
import { IRefreshTokenInput } from '../../../interfaces/user-interface'

export interface IRefreshToken {
  refreshToken: (refreshToken: IRefreshTokenInput) => Promise<HttpResponse>
}
