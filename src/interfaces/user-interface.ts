
export interface IUser {
  user_id?: string
  userName: string
  password: string
  email: string
}

export interface IBaseUserInput {
  userName: string
  hashPassword: string
  email: string
}
export interface ILoginUserInput {
  password: string
  email: string
}
