import querystring from 'querystring'
import isUrlValid from '../utils/isUrlValid'

export default async function validateQueryString(ctx, next) {
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
