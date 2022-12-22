import { Router } from 'express'
import { AdapterRoute } from '../adapters/express-adapter'
import { makeLogoutUserController } from '../factories/logoutUser-factory'

/* A function that is being exported to set and endpoint. */
export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.delete('/logoutUser', AdapterRoute(makeLogoutUserController()))
}
