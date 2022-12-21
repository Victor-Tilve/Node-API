import { Router } from 'express'
import { AdapterRoute } from '../adapters/express-adapter'
import { makeLoginUser } from '../factories/loginUser-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.post('/login', AdapterRoute(makeLoginUser()))
}
