import { RefreshTokenController } from '../../controllers/user/refreshToken-controller'
import { RefreshTokenData } from '../../data/useCases/user/refreshToken-data'
import { DatabaseRepository } from '../../domain/repositories/dataBase-repository'

export const makeRefreshToken = (): RefreshTokenController => {
  const databaseRepository = new DatabaseRepository()
  const loginUserData = new RefreshTokenData(databaseRepository)
  const loginUserController = new RefreshTokenController(loginUserData)

  return loginUserController
}
