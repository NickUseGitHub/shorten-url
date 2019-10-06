export default async function redirectToShortenUrl(ctx, next) {
  if (!ctx.url) {
    await next()
    return
  }

  const reqUrl = ctx.url.split('/').join('')
  const valueFromRedis = await ctx.connectors.redisDB.getValue(reqUrl)

  if (valueFromRedis) {
    ctx.redirect(valueFromRedis)
    return
  }

  await next()
}
