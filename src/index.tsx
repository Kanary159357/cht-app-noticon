import { Hono } from 'hono'
import { renderToString } from 'react-dom/server'

const app = new Hono()

app.put('/function', async (c) => {
  const body = await c.req.json()

  return c.json({
    result: {
      type: 'wam',
      attributes: {
        appId: '66d6dff229c8c8a8740b',
        name: '',
        wamArgs: {
          managerId: body.context.caller.id,
        },
      },
    },
  })
})

app.get('/', (c) => {
  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          {process.env.VERCEL ? (
            <>
              <script type="module" src="./main.js"></script>
              <link rel="stylesheet" href="./main.css" />
            </>
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
