import { badRequest } from '../helpers/http-helper'
import { IDatabaseRepository } from '../interfaces/database-interface'
import { HttpResponse } from '../interfaces/http-interface'
import { ILoginUserInput } from '../interfaces/user-interface'
import bcrypt from 'bcrypt'
import { WrongLoginParams } from '../errors/client-error'
/**
 *
 */
export class UserService {
  databaseRepository: IDatabaseRepository
  constructor (databaseRepository: IDatabaseRepository) {
    this.databaseRepository = databaseRepository
  }

  async loginUser (user: ILoginUserInput): Promise<HttpResponse> {
    try {
      const userResponse = await this.databaseRepository.getUserByEmail(user.email)
      if (userResponse !== undefined) {
        const hashedPassword = userResponse.password
        const password = user.password
        if (await bcrypt.compare(password, hashedPassword)) {
          return {
            statusCode: 200,
            body: 'User was logged with successes' // FIXME: Return token and refresh token
          }
        } else {
          console.log('Wrong password')
          return badRequest(new WrongLoginParams('Password'))
        }
      } else {
        console.log('User is not registered')
        return badRequest(new WrongLoginParams('Email'))
      }
    } catch (error) {
      console.log('There was an Error: ' + JSON.stringify(error))
      return badRequest(error)
    }
  }
}
