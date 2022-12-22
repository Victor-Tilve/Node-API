import { LoginUserController } from '../../controllers/user/login-controller'
import { LoginUserData } from '../../data/useCases/user/loginUser-data'
import { DatabaseRepository } from '../../domain/repositories/dataBase-repository'

/**
 * This function creates a new LoginUserController object and returns it.
 * @returns A LoginUserController
 */
export const makeLoginUserController = (): LoginUserController => {
  const databaseRepository = new DatabaseRepository()
  const loginUserData = new LoginUserData(databaseRepository)
  const loginUserController = new LoginUserController(loginUserData)

  return loginUserController
}
