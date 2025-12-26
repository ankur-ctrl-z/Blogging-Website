import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signupInput, signinInput } from '@ankur-sharma/medium-common'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

function getPrisma(dbUrl: string) {
  return new PrismaClient({
    datasourceUrl: dbUrl, 
  }).$extends(withAccelerate())
}

userRouter.post('/signup', async (c) => {
  const body = await c.req.json()
  const { success } = signupInput.safeParse(body)
  
  if (!success) {
    c.status(411)
    return c.json({ message: 'Inputs are not correct' })
  }

  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        username: body.username,
        password: body.password,
      },
    })

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ token })
  } catch (error) {
    c.status(411)
    return c.text('User already exists with this email')
  }
})

userRouter.post('/signin', async (c) => {
  const body = await c.req.json()
  const { success } = signinInput.safeParse(body)

  if (!success) {
    c.status(411)
    return c.json({ message: 'Inputs are not correct' })
  }

  const prisma = getPrisma(c.env.DATABASE_URL)

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    })

    if (!user) {
      c.status(403)
      return c.text('Invalid credentials')
    }

    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ token })
  } catch (error) {
    c.status(500)
    return c.text('Internal server error')
  }
})



