import { User } from '../../domain/models/user-model'
import { ICreateUserData } from '../../domain/useCases/user/createUser-interface'
import { MissingFormalParameter } from '../../errors/client-error'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'
import bcrypt from 'bcrypt'

/* It receives an httpRequest, checks if the request body has all the required properties, hashes the
password, creates a new user and then tries to create the user in the database */
export class RegistryUserController implements Controller {
  constructor (private readonly registryUser: ICreateUserData) {
    this.registryUser = registryUser
  }

  /**
  * It receives an httpRequest, checks if the request body has all the required properties, hashes the
  * password, creates a new user and then tries to create the user in the database
  * @param {HttpRequest} httpRequest - HttpRequest: This is the request object that comes from the
  * controller.
  * @returns A function that returns a Promise of HttpResponse
  */
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

  /**
 * It takes a string, hashes it, and returns the hash
 * @param {string} data - The data to be hashed.
 * @returns A promise that resolves to a string.
 */
  async hash (data: string): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/return-await
    return await bcrypt.hash(data, 10)
  }
}
