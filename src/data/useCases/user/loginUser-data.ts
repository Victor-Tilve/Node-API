import { ILoginUser } from '../../../domain/useCases/user/loginUser-interface'
import { IDatabaseRepository } from '../../../interfaces/database-interface'
import { HttpResponse } from '../../../interfaces/http-interface'
import { ILoginUserInput } from '../../../interfaces/user-interface'
import { UserService } from '../../../services/user-service'
// import { IQueryParams, MonetaryAidResponse } from '../../../interfaces/transaction-interface'

export class LoginUserData implements ILoginUser {
  userService: UserService
  constructor (databaseRepository: IDatabaseRepository) {
    this.userService = new UserService(databaseRepository)
  }

  async loginUser (user: ILoginUserInput): Promise<HttpResponse> {
    return await this.userService.loginUser(user)
  }
}
