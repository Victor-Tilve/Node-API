import jwt from 'jsonwebtoken'
import { UserService } from '../services/user-service'

export function generateAccessToken (payload: { email: string }): string {
  return jwt.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: '15m' })
}
export function generateRefreshToken (payload: { email: string }): string {
  const refreshToken = jwt.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: '20m' })
  UserService.refreshTokens.push(String(refreshToken))
  return refreshToken
}
