import Koa from 'koa'
import Router from 'koa-router'
import mount from 'koa-mount'
import serve from 'koa-static'
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
  const parsedUrl = querystring.parse(ctx.querystring)
  const urlForShorten = parsedUrl.url

  if (!parsedUrl.url) {
    ctx.throw(400, 'querystring url is required')
    return
  }

  ctx.body = JSON.stringify({
    data: {
      shortUrl: `${urlForShorten} aloha`,
    },
  })
})

router.get('(.*)', appHandler)

app.use(mount('/static', serve(__dirname + '/static')))
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
