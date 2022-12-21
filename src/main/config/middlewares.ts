import { Express } from 'express'
import { bodyParser, cors } from '../middleware'
// FIXME: add helmet for to secure your apps by setting various HTTP headers, which mitigate common attack vectors.
export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
