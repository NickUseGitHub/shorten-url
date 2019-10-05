import Koa from 'koa'
import helloString from './helloworldString'

const app = new Koa()
const port = 3000

// logger

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// response

app.use(async ctx => {
  ctx.body = helloString
})

console.log(`app is now listen on port: ${port}`)
app.listen(port)
