import { ILogoutUser } from '../../../domain/useCases/user/logoutUser-interface'
import { IDatabaseRepository } from '../../../interfaces/database-interface'
import { HttpResponse } from '../../../interfaces/http-interface'
import { UserService } from '../../../services/user-service'
// import { IQueryParams, MonetaryAidResponse } from '../../../interfaces/transaction-interface'

export class LogoutUserData implements ILogoutUser {
  userService: UserService
  constructor (databaseRepository: IDatabaseRepository) {
    this.userService = new UserService(databaseRepository)
  }

  async logoutUser (token: string): Promise<HttpResponse> {
    return await this.userService.logoutUser(token)
  }
}
