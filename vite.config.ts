import { defineConfig } from 'vite'
import devServer from '@hono/vite-dev-server'


export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: './src/main.tsx',
          output: {
            entryFileNames: 'static/main.js'
          }
        }
      },
    }
  } else {
    return {
      plugins: [
        devServer({
          entry: 'src/index.tsx'
        })
      ]
    }
  }
})