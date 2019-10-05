import Koa from 'koa'
import Router from 'koa-router'

const app = new Koa()
const port = 3000

const router = new Router()

router.get('/shorturl', ctx => {
  ctx.set('Content-Type: application/json')
  ctx.body = JSON.stringify({
    data: {
      shortUrl: 'shorturl',
    },
  })
})

app.use(router.routes()).use(router.allowedMethods())

console.log(`app is now listen on port: ${port}`)
app.listen(port)
