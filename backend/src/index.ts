import { Hono } from 'hono'
import { cors } from 'hono/cors' // ✅ Import CORS middleware
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

// ✅ Use CORS middleware for all routes
app.use('*', cors({
  origin: 'https://blogging-website-one.vercel.app/', // use '*' only for testing
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

// Routes
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blog', blogRouter)

export default app
