import { ILogoutUserData } from '../../../domain/useCases/user/logoutUser-interface'
import { IDatabaseRepository } from '../../../interfaces/database-interface'
import { HttpResponse } from '../../../interfaces/http-interface'
import { UserService } from '../../../services/user-service'

/* It's a class that implements the ILogoutUserData interface and it's constructor takes in an
IDatabaseRepository object */
export class LogoutUserData implements ILogoutUserData {
  userService: UserService
  constructor (databaseRepository: IDatabaseRepository) {
    this.userService = new UserService(databaseRepository)
  }

  /**
 * It logs out a user
 * @param {string} token - The token that was generated when the user logged in.
 * @returns The response from the userService.logoutUser() method.
 */
  async logoutUser (token: string): Promise<HttpResponse> {
    return await this.userService.logoutUser(token)
  }
}
