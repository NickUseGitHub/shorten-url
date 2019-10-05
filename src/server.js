import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './app/App'

function readerAppToString() {
  return ReactDOMServer.renderToString(<App />)
}

export default async function appHandler(ctx) {
  const appBody = await readerAppToString()

  ctx.body = `
  <html>
    <head>
      <title>Universal App</title>
    </head>
    <body>
      <div id="container">
        ${appBody}
      <div>
    </body>
  </html>
  `
}
