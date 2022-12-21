import { Router } from 'express'
import { AdapterRoute } from '../adapters/express-adapter'
import { makeUserRegistry } from '../factories/userRegistry-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/createUser', AdapterRoute(makeUserRegistry()))
}
