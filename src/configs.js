export default {
  protocal: process.env.PROTOCAL || 'http',
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL || 'localhost',
  redisPort: process.env.REDIS_PORT || 6379,
}
