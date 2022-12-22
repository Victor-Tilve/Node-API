import { IRefreshTokenData } from '../../domain/useCases/user/refreshToken-interface'
import { MissingFormalParameter } from '../../errors/client-error'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'

/* It receives a httpRequest object, checks if it has the required properties, and if it does, it calls
the refreshToken function from the refreshTokenData class, and returns the result */
export class RefreshTokenController implements Controller {
  constructor (private readonly refreshTokenData: IRefreshTokenData) {
    this.refreshTokenData = refreshTokenData
  }

  /**
 * It receives a httpRequest object, checks if it has the required properties, and if it does, it calls
 * the refreshToken function from the refreshTokenData class, and returns the result
 * @param {HttpRequest} httpRequest - HttpRequest - This is the request object that contains the
 * request data.
 * @returns A function that returns a Promise of HttpResponse
 */
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredProperties = ['token', 'email']
    for (const prop of requiredProperties) {
      if (httpRequest.body[prop] === undefined) {
        return badRequest(new MissingFormalParameter(prop))
      }
    }
    const { token, email } = httpRequest.body

    try {
      const refreshedToken = await this.refreshTokenData.refreshToken({ token, email })
      return success(refreshedToken)
    } catch (error) {
      return serverError(error)
    }
  }
}
