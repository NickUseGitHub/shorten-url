export default async function denyRequestFromBandedIp(ctx, next) {
  try {
    const key = ctx.ip
    const numberOfReq = await ctx.connectors.redisDB.getValue(key)
    const maxRequestForBand = 10

    if (numberOfReq >= maxRequestForBand) {
      const httpErrMsg = 403
      ctx.status = httpErrMsg
      ctx.throw(httpErrMsg)
      return
    }

    await next()
  } catch (err) {
    console.log('err', err.message)
  }
}
