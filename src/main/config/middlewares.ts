import { Express } from 'express'
import { bodyParser, cors } from '../middleware'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
