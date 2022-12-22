import { Router } from 'express'
import { AdapterRoute } from '../adapters/express-adapter'
import { makeUserRegistryController } from '../factories/userRegistry-factory'

/* A function that is being exported to set and endpoint. */
export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/createUser', AdapterRoute(makeUserRegistryController()))
}
