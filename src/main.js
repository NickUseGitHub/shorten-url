import Koa from 'koa'
import Router from 'koa-router'
import mount from 'koa-mount'
import serve from 'koa-static'
import querystring from 'querystring'

import { getUniqId, isUrlValid } from './utils'
import appHandler from './server'
import initialConnect from './connectors'

const app = new Koa()
const port = 3000

app.context.connectors = initialConnect()

const router = new Router()

async function validateQueryString(ctx, next) {
  const parsedUrl = querystring.parse(ctx.querystring)

  if (!parsedUrl.url) {
    ctx.throw(400, 'querystring url is required')
    return
  }

  const urlForShorten = parsedUrl.url

  if (!isUrlValid(urlForShorten)) {
    ctx.throw(400, 'querystring url is invalid')
    return
  }

  await next()
}

router.get('/shorturl', validateQueryString, async function(ctx) {
  const uniqId = getUniqId()

  const parsedUrl = querystring.parse(ctx.querystring)
  const urlForShorten = parsedUrl.url
  ctx.connectors.redisDB.setValue(uniqId, urlForShorten)
  const shortenUrl = `http://localhost:3000/${uniqId}`

  ctx.body = JSON.stringify({
    data: {
      shortUrl: shortenUrl,
    },
  })
})

router.get('/', appHandler)

app.use(mount('/static', serve(__dirname + '/static')))
app.use(async function redirectToShortenUrl(ctx, next) {
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
})
app.use(async function denyRequestFromBandedIp(ctx, next) {
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
})
app.use(async function bandIpFromRadomRequestUrl(ctx, next) {
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
})

app.use(router.routes()).use(router.allowedMethods())

console.log(`app is now listen on port: ${port}`)
app.listen(port)
