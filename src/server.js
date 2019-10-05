import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from './app/App'

function readerAppToString() {
  return ReactDOMServer.renderToString(<App />)
}

export default async function appHandler(ctx) {
  const appBody = await readerAppToString()
  const appBundleScriptUrl = 'http://localhost:3000/static/app.bundle.js'

  ctx.body = `
  <html>
    <head>
      <title>Universal App</title>
    </head>
    <body id="root">
        ${appBody}
    </body>
    <script type="text/javascript" src="${appBundleScriptUrl}"></script>
  </html>
  `
}
