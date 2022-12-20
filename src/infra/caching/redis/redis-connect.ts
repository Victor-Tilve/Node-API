import * as redis from 'redis'
export async function redisCreateClient (): Promise<any> {
  const redisClient = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT)
    },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    url: process.env.REDIS_URL
    // FIXME: use password
  })
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  redisClient.on('error', (error) => console.error(`Error : ${error}`))
  await redisClient.connect()
  return redisClient
}
