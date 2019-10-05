import Koa from 'koa'
import Router from 'koa-router'
import helloString from './helloworldString'

const app = new Koa()
const port = 3000

const router = new Router()

router.get('/', ctx => {
  ctx.body = helloString
})

app.use(router.routes()).use(router.allowedMethods())

console.log(`app is now listen on port: ${port}`)
app.listen(port)
