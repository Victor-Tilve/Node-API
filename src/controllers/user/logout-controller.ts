import { ILogoutUserData } from '../../domain/useCases/user/logoutUser-interface'
import { MissingFormalParameter } from '../../errors/client-error'
import { badRequest } from '../../helpers/http-helper'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'

/* It receives an httpRequest, checks if it has the required properties, and if it does, it calls the
logoutUser function from the logoutUserData class, passing the token as a parameter */
export class LogoutUserController implements Controller {
  constructor (private readonly logoutUserData: ILogoutUserData) {
    this.logoutUserData = logoutUserData
  }

  /**
 * It receives an httpRequest, checks if it has the required properties, and if it does, it calls the
 * logoutUser function from the logoutUserData class, passing the token as a parameter
 * @param {HttpRequest} httpRequest - HttpRequest
 * @returns A promise of an HttpResponse
 */
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredProperties = ['token']
    for (const prop of requiredProperties) {
      if (httpRequest.body[prop] === undefined) {
        return badRequest(new MissingFormalParameter(prop))
      }
    }
    const { token } = httpRequest.body
    const logoutUserResponse = this.logoutUserData.logoutUser(token)
    return await logoutUserResponse
  }
}
