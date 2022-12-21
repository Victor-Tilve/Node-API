import { ICreateUser } from '../../../domain/useCases/user/createUser-interface'
import { IDatabaseRepository } from '../../../interfaces/database-interface'
import { HttpResponse } from '../../../interfaces/http-interface'
import { IBaseUserInput } from '../../../interfaces/user-interface'
import { DatabaseService } from '../../../services/database-service'
// import { IQueryParams, MonetaryAidResponse } from '../../../interfaces/transaction-interface'

export class RegisterUserData implements ICreateUser {
  databaseService: DatabaseService
  constructor (databaseRepository: IDatabaseRepository) {
    this.databaseService = new DatabaseService(databaseRepository)
  }

  async createUser (newUser: IBaseUserInput): Promise<HttpResponse> {
    return await this.databaseService.createUser(newUser)
  }
}
