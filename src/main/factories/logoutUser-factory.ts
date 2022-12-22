import { LogoutUserController } from '../../controllers/user/logout-controller'
import { LogoutUserData } from '../../data/useCases/user/logoutUser-data'
import { DatabaseRepository } from '../../domain/repositories/dataBase-repository'

export const makeLogoutUser = (): LogoutUserController => {
  const databaseRepository = new DatabaseRepository()
  const logoutUserData = new LogoutUserData(databaseRepository)
  const logoutUserController = new LogoutUserController(logoutUserData)

  return logoutUserController
}
