
/* Defining the type of the user object. */
export interface IUser {
  user_id?: string
  userName: string
  password: string
  email: string
}

/* Defining the type of the input for the createUser function. */
export interface IBaseUserInput {
  userName: string
  hashPassword: string
  email: string
}

/* Defining the type of the input for the login function. */
export interface ILoginUserInput {
  password: string
  email: string
}

/* A type definition for the input of the refreshToken function. */
export interface IRefreshTokenInput {
  token: string
  email: string
}
