import redis from 'redis'
import RedisDb from './redisDb'

export default function initialConnect() {
  const redisClient = redis.createClient()

  redisClient.on('error', function(err) {
    console.log('Redis Error ' + err)
  })

  redisClient.on('connect', function(err) {
    if (err) {
      console.log('Redis connection Error' + err)
    }

    console.log('Redis is now connected on ported 6379')
  })

  return {
    redisDB: new RedisDb({ client: redisClient }),
  }
}
