import { ICreateUserData } from '../../../domain/useCases/user/createUser-interface'
import { IDatabaseRepository } from '../../../interfaces/database-interface'
import { HttpResponse } from '../../../interfaces/http-interface'
import { IBaseUserInput } from '../../../interfaces/user-interface'
import { DatabaseService } from '../../../services/database-service'

/* It's a class that creates a user */
export class RegisterUserData implements ICreateUserData {
  databaseService: DatabaseService
  constructor (databaseRepository: IDatabaseRepository) {
    this.databaseService = new DatabaseService(databaseRepository)
  }

  /**
 * It creates a new user in the database
 * @param {IBaseUserInput} newUser - IBaseUserInput
 * @returns HttpResponse
 */
  async createUser (newUser: IBaseUserInput): Promise<HttpResponse> {
    return await this.databaseService.createUser(newUser)
  }
}
