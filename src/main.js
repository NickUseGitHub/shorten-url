import Koa from 'koa'
import Router from 'koa-router'
import querystring from 'querystring'
import appHandler from './server'

const app = new Koa()
const port = 3000

const router = new Router()

async function validateQueryString(ctx, next) {
  const parsedUrl = querystring.parse(ctx.querystring)

  if (!parsedUrl.url) {
    ctx.throw(400, 'querystring url is required')
    return
  }
  next()
}

router.get('/shorturl', validateQueryString, ctx => {
  ctx.set('Content-Type', 'application/javascript')
  ctx.body = JSON.stringify({
    data: {
      shortUrl: 'shorturl',
    },
  })
})

router.get('(.*)', appHandler)

app.use(async function redirectToShortenUrl(ctx, next) {
  const reqUrl = ctx.url

  const isShortUrl = reqUrl === '/heyitshorten'
  if (isShortUrl === true) {
    ctx.redirect('https://www.google.com')
    return
  }

  await next()
})
app.use(router.routes()).use(router.allowedMethods())

console.log(`app is now listen on port: ${port}`)
app.listen(port)
