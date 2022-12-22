import { badRequest, success } from '../helpers/http-helper'
import { IDatabaseRepository } from '../interfaces/database-interface'
import { HttpResponse } from '../interfaces/http-interface'
import { ILoginUserInput, IRefreshTokenInput } from '../interfaces/user-interface'
import bcrypt from 'bcrypt'
import { WrongLoginParams } from '../errors/client-error'
import { generateAccessToken, generateRefreshToken } from '../helpers/token-helper'

export class UserService {
  static refreshTokens = [] as any
  databaseRepository: IDatabaseRepository
  constructor (databaseRepository: IDatabaseRepository) {
    this.databaseRepository = databaseRepository
  }

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

  async logoutUser (token: string): Promise<HttpResponse> {
    UserService.refreshTokens = UserService.refreshTokens.filter((c) => c !== token)
    return {
      statusCode: 204,
      body: ''
    }
  }

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
