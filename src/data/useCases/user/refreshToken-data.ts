import { IRefreshTokenData } from '../../../domain/useCases/user/refreshToken-interface'
import { IDatabaseRepository } from '../../../interfaces/database-interface'
import { HttpResponse } from '../../../interfaces/http-interface'
import { IRefreshTokenInput } from '../../../interfaces/user-interface'
import { UserService } from '../../../services/user-service'

/* It's a class that implements the IRefreshTokenData interface and it's constructor takes an
IDatabaseRepository object */
export class RefreshTokenData implements IRefreshTokenData {
  userService: UserService
  constructor (databaseRepository: IDatabaseRepository) {
    this.userService = new UserService(databaseRepository)
  }

  /**
 * It takes a refresh token as an argument, and returns a promise of an HttpResponse
 * @param {IRefreshTokenInput} refreshToken - IRefreshTokenInput
 * @returns A promise of an HttpResponse
 */
  async refreshToken (refreshToken: IRefreshTokenInput): Promise<HttpResponse> {
    return this.userService.refreshToken(refreshToken)
  }
}
