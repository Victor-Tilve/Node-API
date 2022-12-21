import { MissingFormalParameter } from '../../errors/client-error'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'
import { ILoginUser } from '../../domain/useCases/user/loginUser-interface'

export class LoginUserController implements Controller {
  constructor (private readonly loginUser: ILoginUser) {
    this.loginUser = loginUser
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredProperties = ['email', 'password']
    for (const prop of requiredProperties) {
      if (httpRequest.body[prop] === undefined) {
        return badRequest(new MissingFormalParameter(prop))
      }
    }
    const { password, email } = httpRequest.body
    // const hashPassword = await this.hash(password)

    try {
      const createUserResponse = await this.loginUser.loginUser({ password, email })
      return success(createUserResponse)
    } catch (error) {
      return serverError(error)
    }
  }
}
