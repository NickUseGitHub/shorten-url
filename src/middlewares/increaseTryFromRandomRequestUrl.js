export default async function increaseTryFromRandomRequestUrl(ctx, next) {
  try {
    await next()
    const status = ctx.status
    if (status === 404) {
      const key = ctx.ip
      ctx.connectors.redisDB.increaseKey(key)
      ctx.throw(404)
    }
  } catch (err) {
    ctx.status = err.status || 500
    console.log('err', err.message)
  }
}
