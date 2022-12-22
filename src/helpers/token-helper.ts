import jwt from 'jsonwebtoken'
import { UserService } from '../services/user-service'

/**
 * It takes an object with an email property and returns a JWT
 * @param payload - The data you want to sign.
 * @returns A string
 */
export function generateAccessToken (payload: { email: string }): string {
  return jwt.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: '15m' })
}

/**
 * It takes in a payload, signs it with a secret, and returns a refresh token
 * @param payload - { email: string }
 * @returns A string
 */
export function generateRefreshToken (payload: { email: string }): string {
  const refreshToken = jwt.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: '20m' })
  UserService.refreshTokens.push(String(refreshToken))
  return refreshToken
}

/**
 * It gets the token from the request header, verifies it, and if it's valid, it calls the next
 * function in the middleware chain
 * @param req - The request object
 * @param res - the response object
 * @param next - a function that will be called when the middleware is done.
 */
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
