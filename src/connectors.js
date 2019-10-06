import redis from 'redis'

export default function initialConnect() {
  const redisClient = redis.createClient()

  redisClient.on('error', function(err) {
    console.log('Error ' + err)
  })

  redisClient.on('connect', function(err) {
    if (err) {
      console.log('Error ' + err)
    }

    console.log('Redis is now connected on ported 6379')
  })

  return {
    redisClient,
  }
}
