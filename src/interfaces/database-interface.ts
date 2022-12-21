import { HttpResponse } from './http-interface'
import { IBaseUserInput, IUser } from './user-interface'

export interface IDatabaseRepository {
  createUser: (newUser: IBaseUserInput) => Promise<HttpResponse>
  getUserByEmail: (email: string) => Promise<IUser | undefined>
}
