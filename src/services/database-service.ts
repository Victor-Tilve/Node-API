import { IDatabaseRepository } from '../interfaces/database-interface'
import { HttpResponse } from '../interfaces/http-interface'
import { IBaseUserInput, IUser } from '../interfaces/user-interface'

/**
 *
 */
export class DatabaseService {
  databaseRepository: IDatabaseRepository
  constructor (databaseRepository: IDatabaseRepository) {
    this.databaseRepository = databaseRepository
  }

  async createUser (newUser: IBaseUserInput): Promise<HttpResponse> {
    return await this.databaseRepository.createUser(newUser)
  }

  async getUserByEmail (email: string): Promise<IUser | undefined> {
    return await this.databaseRepository.getUserByEmail(email)
  }
}
