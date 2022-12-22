import { MissingFormalParameter } from '../../errors/client-error'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'
import { ILoginUserData } from '../../domain/useCases/user/loginUser-interface'

/* It receives an httpRequest object, checks if the required properties are present, and if they are,
it calls the loginUser function from the loginUserData class, which returns a loginUserResponse
object */
export class LoginUserController implements Controller {
  constructor (private readonly loginUserData: ILoginUserData) {
    this.loginUserData = loginUserData
  }

  /**
 * It receives an httpRequest object, checks if the required properties are present, and if they are,
 * it calls the loginUser function from the loginUserData class, which returns a loginUserResponse
 * object
 * @param {HttpRequest} httpRequest - HttpRequest - This is the request object that is passed to the
 * controller.
 * @returns The loginUserResponse is being returned.
 */
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
      const loginUserResponse = await this.loginUserData.loginUser({ password, email })
      return success(loginUserResponse)
    } catch (error) {
      return serverError(error)
    }
  }
}
