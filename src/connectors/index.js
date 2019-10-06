import redis from 'redis'
import RedisDb from './redisDb'
import configs from '../configs'

export default function initialConnectors() {
  const redisPort = configs.redisPort
  const redisHost = configs.redisHost
  const redisClient = redis.createClient(redisPort, redisHost)

  redisClient.on('error', function(err) {
    console.log('Redis Error ' + err)
  })

  redisClient.on('connect', function(err) {
    if (err) {
      console.log('Redis connection Error' + err)
    }

    console.log(`Redis is now connected on ported ${redisPort}`)
  })

  return {
    redisDB: new RedisDb({ client: redisClient }),
  }
}
