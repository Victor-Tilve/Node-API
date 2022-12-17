import app from '../config/app'
import ConnectRedis from '../../infra/caching/redis/redis-connect'
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  console.log('server is working. Port: \x1b[32m%s\x1b[0m', process.env.PORT)
  void ConnectRedis()
})
