import { Router } from 'express'
import { AdapterRoute } from '../adapters/express-adapter'
import { makeRefreshToken } from '../factories/refreshToken-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/refreshToken', AdapterRoute(makeRefreshToken()))
}
