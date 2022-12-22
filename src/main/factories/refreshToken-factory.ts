import { RefreshTokenController } from '../../controllers/user/refreshToken-controller'
import { RefreshTokenData } from '../../data/useCases/user/refreshToken-data'
import { DatabaseRepository } from '../../domain/repositories/dataBase-repository'

/**
 * It creates a new instance of the RefreshTokenController class, and returns it
 * @returns A RefreshTokenController
 */
export const makeRefreshTokenController = (): RefreshTokenController => {
  const databaseRepository = new DatabaseRepository()
  const loginUserData = new RefreshTokenData(databaseRepository)
  const loginUserController = new RefreshTokenController(loginUserData)

  return loginUserController
}
