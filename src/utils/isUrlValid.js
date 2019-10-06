import url from 'url'

export default function isUrlValid(urlStr) {
  if (!urlStr) return false

  const parsedUrl = url.parse(urlStr)

  return !!parsedUrl.hostname
}
