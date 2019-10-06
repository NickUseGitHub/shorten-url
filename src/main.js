import dotenv from 'dotenv'
import Koa from 'koa'
import Router from 'koa-router'
import mount from 'koa-mount'
import serve from 'koa-static'
import querystring from 'querystring'

import getUniqId from './utils/getUniqId'
import appHandler from './server'
import initialConnectors from './connectors'
import {
  redirectToShortenUrl,
  denyRequestFromBandedIp,
  increaseTryFromRandomRequestUrl,
  validateQueryString,
} from './middlewares'

dotenv.config()

const app = new Koa()
const port = 3000

app.context.connectors = initialConnectors()

const router = new Router()

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
app.use(redirectToShortenUrl)
app.use(denyRequestFromBandedIp)
app.use(increaseTryFromRandomRequestUrl)

app.use(router.routes()).use(router.allowedMethods())

console.log(`app is now listen on port: ${port}`)
app.listen(port)
