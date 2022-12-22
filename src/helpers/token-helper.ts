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

export function validateToken (req, res, next): void {
  // get token from request header
  const authHeader = req.headers.authorization
  const token = authHeader.split(' ')[1]

  if (token == null) res.sendStatus(400).send('Token not present')
  jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (err, email) => {
    if (err) {
      res.status(403).send('Token invalid')
    } else {
      next()
    }
  })
}
