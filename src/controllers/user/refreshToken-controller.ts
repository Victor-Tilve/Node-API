import { IRefreshToken } from '../../domain/useCases/user/refreshToken-interface'
import { MissingFormalParameter } from '../../errors/client-error'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'

export class RefreshTokenController implements Controller {
  constructor (private readonly refreshToken: IRefreshToken) {
    this.refreshToken = refreshToken
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredProperties = ['token', 'email']
    for (const prop of requiredProperties) {
      if (httpRequest.body[prop] === undefined) {
        return badRequest(new MissingFormalParameter(prop))
      }
    }
    const { token, email } = httpRequest.body

    try {
      const refreshedToken = await this.refreshToken.refreshToken({ token, email })
      return success(refreshedToken)
    } catch (error) {
      return serverError(error)
    }
  }
}
