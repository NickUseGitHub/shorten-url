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

router.get('(.*)', appHandler)

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
app.use(router.routes()).use(router.allowedMethods())

console.log(`app is now listen on port: ${port}`)
app.listen(port)
