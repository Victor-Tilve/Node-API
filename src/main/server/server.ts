import app from '../config/app'
import { connectToDB } from '../../infra/db/postgreslq/postgresql-connect'

// COMEBACK: Test missing
// COMEBACK: Documentation missing
/* Server entry point. */
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log('server is working. Port: \x1b[32m%s\x1b[0m', process.env.PORT)
  void connectToDB()
})
