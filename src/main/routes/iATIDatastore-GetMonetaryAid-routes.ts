import { Router } from 'express'
import { AdapterRoute } from '../adapters/express-adapter'
import { makeGetMonetaryAidController } from '../factories/IatiDatastoreApi-factory'

export default (router: Router): void => {
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  router.get('/monetary-aid/:countryCode', AdapterRoute(makeGetMonetaryAidController()))
}
