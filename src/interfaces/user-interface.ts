import { HttpResponse } from './http-interface'

export interface IBaseUser extends IBaseUserInput {
}

export interface IBaseUserInput {
  userName: string
  hashPassword: string
  email: string
}

export interface IDatabaseRepository {
  createUser: (newUser: IBaseUserInput) => Promise<HttpResponse>
}
