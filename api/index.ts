import app from '../src/index'
import { handle } from 'hono/vercel'

export const runtime = 'edge'
export const config = {
  runtime: 'edge',
}
export default handle(app)
