import { IRefreshToken } from '../../../domain/useCases/user/refreshToken-interface'
import { IDatabaseRepository } from '../../../interfaces/database-interface'
import { HttpResponse } from '../../../interfaces/http-interface'
import { IRefreshTokenInput } from '../../../interfaces/user-interface'
import { UserService } from '../../../services/user-service'

export class RefreshTokenData implements IRefreshToken {
  userService: UserService
  constructor (databaseRepository: IDatabaseRepository) {
    this.userService = new UserService(databaseRepository)
  }

  async refreshToken (refreshToken: IRefreshTokenInput): Promise<HttpResponse> {
    return this.userService.refreshToken(refreshToken)
  }
}
