import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'

type Env = {
  Bindings: {
    MY_VAR: string
  }
}

const app = new Hono<Env>()

app.get('/api/clock', (c) => {
  return c.json({
    time: new Date().toLocaleTimeString()
  })
})

app.get('/wam', (c) => {
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link rel="stylesheet" href="https://cdn.simplecss.org/simple.min.css" />
          {process.env.VERCEL ? (
            <script type="module" src="./static/main.js"></script>
          ) : (
            <script type="module" src="./src/main.tsx"></script>
          )}
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    )
  )
})

export default app