import { HttpResponse } from './http-interface'
import { IBaseUserInput, IUser } from './user-interface'

/* Defining the interface for the DatabaseRepository class. */
export interface IDatabaseRepository {
  createUser: (newUser: IBaseUserInput) => Promise<HttpResponse>
  getUserByEmail: (email: string) => Promise<IUser | undefined>
}
