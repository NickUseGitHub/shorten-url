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
      <title>Shortent Url App</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">

      <link rel="apple-touch-icon" sizes="180x180" href="http://localhost:3000/static/fav/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="http://localhost:3000/static/fav/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="http://localhost:3000/static/fav/favicon-16x16.png">
      <link rel="manifest" href="http://localhost:3000/static/fav/site.webmanifest">
    </head>
    <body id="root">
        ${appBody}
    </body>
    <script type="text/javascript" src="${appBundleScriptUrl}"></script>
  </html>
  `
}
