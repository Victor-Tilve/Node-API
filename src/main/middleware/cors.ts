import { Request, Response, NextFunction } from 'express'
/**
 * It sets the CORS headers on the response object
 * @param {Request} req - Request - the request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - This is a function that is called when the middleware is complete.
 */
export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', '*')
  res.set('access-control-allow-headers', '*')
  res.set('access-control-allow-methods', '*')
  next()
}
