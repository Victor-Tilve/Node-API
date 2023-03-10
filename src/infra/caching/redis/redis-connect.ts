import * as redis from 'redis'
/**
 * It creates a Redis client and returns it
 * @returns A promise that resolves to a redis client.
 */
export async function redisCreateClient (): Promise<any> {
  const redisClient = redis.createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT)
    },
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD
  })
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  redisClient.on('error', (error) => console.error(`Error : ${error}`))
  await redisClient.connect()
  return redisClient
}
