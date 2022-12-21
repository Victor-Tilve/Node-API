import { User } from '../../domain/models/user-model'
import { ICreateUser } from '../../domain/useCases/user/createUser-interface'
import { MissingFormalParameter } from '../../errors/client-error'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'
import bcrypt from 'bcrypt'

export class RegistryUserController implements Controller {
  constructor (private readonly registryUser: ICreateUser) {
    this.registryUser = registryUser
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredProperties = ['name', 'lastName', 'password', 'email']
    for (const prop of requiredProperties) {
      if (httpRequest.body[prop] === undefined) {
        return badRequest(new MissingFormalParameter(prop))
      }
    }
    const { name, lastName, password, email } = httpRequest.body
    const hashPassword = await this.hash(password)

    const userName = (name as string).toUpperCase() + ' ' + (lastName as string).toUpperCase()
    const newUser = new User({ userName, hashPassword, email })
    try {
      const createUserResponse = await this.registryUser.createUser(newUser)
      return success(createUserResponse)
    } catch (error) {
      return serverError(error)
    }
  }

  async hash (data: string): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/return-await
    return await bcrypt.hash(data, 10)
  }
}
