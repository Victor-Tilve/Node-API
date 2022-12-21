import { LoginUserController } from '../../controllers/user/login-controller'
import { LoginUserData } from '../../data/useCases/user/loginUser-data'
import { DatabaseRepository } from '../../domain/repositories/dataBase-repository'

export const makeLoginUser = (): LoginUserController => {
  const databaseRepository = new DatabaseRepository()
  const loginUserData = new LoginUserData(databaseRepository)
  const loginUserController = new LoginUserController(loginUserData)

  return loginUserController
}
