import { Express, Router } from 'express'
import fg from 'fast-glob'

/* Importing all the routes from the routes folder and adding them to the router. */
export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  fg.sync('**/src/main/routes/**routes.ts').map(async file => (await import(`../../../${file}`)).default(router))
}
