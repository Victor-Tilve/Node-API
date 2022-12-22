import { ILoginUserData } from '../../../domain/useCases/user/loginUser-interface'
import { IDatabaseRepository } from '../../../interfaces/database-interface'
import { HttpResponse } from '../../../interfaces/http-interface'
import { ILoginUserInput } from '../../../interfaces/user-interface'
import { UserService } from '../../../services/user-service'
// import { IQueryParams, MonetaryAidResponse } from '../../../interfaces/transaction-interface'

/* It's a class that implements the ILoginUserData interface and it's constructor takes in an
IDatabaseRepository object */
export class LoginUserData implements ILoginUserData {
  userService: UserService
  constructor (databaseRepository: IDatabaseRepository) {
    this.userService = new UserService(databaseRepository)
  }

  /**
 * It takes an object of type `ILoginUserInput` as an argument, and returns a promise of type
 * `HttpResponse`
 * @param {ILoginUserInput} user - ILoginUserInput
 * @returns HttpResponse
 */
  async loginUser (user: ILoginUserInput): Promise<HttpResponse> {
    return await this.userService.loginUser(user)
  }
}
