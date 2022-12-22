import { Router } from 'express'
import { AdapterRoute } from '../adapters/express-adapter'
import { makeLogoutUser } from '../factories/logoutUser-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.delete('/logoutUser', AdapterRoute(makeLogoutUser()))
}
