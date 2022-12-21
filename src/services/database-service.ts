import { HttpResponse } from '../interfaces/http-interface'
import { IBaseUserInput, IDatabaseRepository } from '../interfaces/user-interface'

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
}
