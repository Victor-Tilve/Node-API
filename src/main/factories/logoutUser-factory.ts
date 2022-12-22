import { LogoutUserController } from '../../controllers/user/logout-controller'
import { LogoutUserData } from '../../data/useCases/user/logoutUser-data'
import { DatabaseRepository } from '../../domain/repositories/dataBase-repository'

/**
 * This function creates a new LogoutUserController and returns it.
 * @returns A LogoutUserController
 */
export const makeLogoutUserController = (): LogoutUserController => {
  const databaseRepository = new DatabaseRepository()
  const logoutUserData = new LogoutUserData(databaseRepository)
  const logoutUserController = new LogoutUserController(logoutUserData)

  return logoutUserController
}
