import { ILogoutUser } from '../../domain/useCases/user/logoutUser-interface'
import { MissingFormalParameter } from '../../errors/client-error'
import { badRequest } from '../../helpers/http-helper'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'

export class LogoutUserController implements Controller {
  constructor (private readonly logoutUserData: ILogoutUser) {
    this.logoutUserData = logoutUserData
  }

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
