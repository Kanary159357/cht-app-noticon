import devServer from '@hono/vite-dev-server'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      build: {
        rollupOptions: {
          input: './src/main.tsx',
          output: {
            assetFileNames: '[name][extname]',
            chunkFileNames: '[name].js',
            entryFileNames: '[name].js',
            dir: 'dist',
          },
        },
      },
    }
  } else {
    return {
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      plugins: [
        devServer({
          entry: 'src/index.tsx',
        }),
      ],
    }
  }
})
