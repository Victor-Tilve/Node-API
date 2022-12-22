import { Express } from 'express'
import { bodyParser, cors } from '../middleware'
// FIXME: add helmet for to secure your apps by setting various HTTP headers, which mitigate common attack vectors.
/* A function that takes in an Express app and returns nothing. */
export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
