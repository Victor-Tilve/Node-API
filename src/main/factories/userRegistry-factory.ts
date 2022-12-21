import { RegistryUserController } from '../../controllers/registry/registryUser-controller'
import { RegisterUserData } from '../../data/useCases/user/registerUser-data'
import { DatabaseRepository } from '../../domain/repositories/dataBase-repository'

export const makeUserRegistry = (): RegistryUserController => {
  const databaseRepository = new DatabaseRepository()
  const registerUserData = new RegisterUserData(databaseRepository)
  const registryUserController = new RegistryUserController(registerUserData)

  return registryUserController
}
