import { badRequest, success } from '../helpers/http-helper'
import { IDatabaseRepository } from '../interfaces/database-interface'
import { HttpResponse } from '../interfaces/http-interface'
import { ILoginUserInput, IRefreshTokenInput } from '../interfaces/user-interface'
import bcrypt from 'bcrypt'
import { WrongLoginParams } from '../errors/client-error'
import { generateAccessToken, generateRefreshToken } from '../helpers/token-helper'

/* User service class */
export class UserService {
  static refreshTokens = [] as any
  databaseRepository: IDatabaseRepository
  constructor (databaseRepository: IDatabaseRepository) {
    this.databaseRepository = databaseRepository
  }

  /**
 * It takes in a user object, checks if the user exists in the database, if the user exists, it checks
 * if the password is correct, if the password is correct, it generates an access token and a refresh
 * token, and returns the access token and refresh token
 * @param {ILoginUserInput} user - ILoginUserInput
 * @returns an object with the statusCode and body.
 */
  async loginUser (user: ILoginUserInput): Promise<HttpResponse> {
    try {
      const userResponse = await this.databaseRepository.getUserByEmail(user.email)
      // console.log('process.env.REFRESH_TOKEN_SECRET: ' + String(process.env.ACCESS_TOKEN_SECRET))

      if (userResponse !== undefined) {
        const hashedPassword = userResponse.password
        const password = user.password
        if (await bcrypt.compare(password, hashedPassword)) {
          const accessToken = generateAccessToken({ email: user.email })
          const refreshToken = generateRefreshToken({ email: user.email })
          return {
            statusCode: 200,
            body: { accessToken, refreshToken }
            // body: { accessToken }
          }
        } else {
          console.log('Wrong password')
          return badRequest(new WrongLoginParams('Password'))
        }
      } else {
        console.log('User is not registered')
        return badRequest(new WrongLoginParams('Email'))
      }
    } catch (error) {
      console.log('There was an Error: ' + JSON.stringify(error))
      return badRequest(error)
    }
  }

  /**
 * It removes the token from the list of refresh tokens
 * @param {string} token - The token that was passed in the request.
 * @returns An object with a statusCode and a body.
 */
  async logoutUser (token: string): Promise<HttpResponse> {
    UserService.refreshTokens = UserService.refreshTokens.filter((c) => c !== token)
    return {
      statusCode: 204,
      body: ''
    }
  }

  /**
 * If the refresh token is valid, remove it from the list of refresh tokens, generate a new access
 * token and refresh token, and return them
 * @param {IRefreshTokenInput} refreshToken - IRefreshTokenInput
 * @returns The accessToken and newRefreshToken are being returned.
 */
  refreshToken (refreshToken: IRefreshTokenInput): HttpResponse {
    if (!UserService.refreshTokens.includes(refreshToken.token)) {
      console.log('Refresh Token Invalid')
      console.log('refreshToken.token: ' + JSON.stringify(refreshToken.token))
      console.log('UserService.refreshTokens: ' + JSON.stringify(UserService.refreshTokens))
      return badRequest(new WrongLoginParams('Token'))
    }
    // remove the old refreshToken from the refreshTokens list
    UserService.refreshTokens = UserService.refreshTokens.filter((c) => c !== refreshToken.token)

    const accessToken = generateAccessToken({ email: refreshToken.email })
    const newRefreshToken = generateRefreshToken({ email: refreshToken.email })

    return success({ accessToken, newRefreshToken })
  }
}
