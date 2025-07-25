import {Hono} from 'hono';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign } from 'hono/jwt';
import { signupInput, signinInput } from '@ankur-sharma/medium-common';


export const userRouter = new Hono<{
        Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	}
}>();


userRouter.post('/signup', async(c) => { 
	const body = await c.req.json();
	const {success} = signupInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			message: "Inputs are not correct"
		})
	}
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
    try {
		const user =  await prisma.user.create({
		data: {
			username: body.username,
			password: body.password,
			name: body.name
		}
	})
	const token = await sign({
		id: user.id
	},c.env.JWT_SECRET)

	return c.text("User logged in successfully: "+ token);
	} catch (error) {
		console.error("Error during signup:",error)
    return c.text('User already exists with this email', 411);
	}
})

userRouter.post('/signin', async(c) => {
	const body = await c.req.json();
	const {success} = signinInput.safeParse(body);
	if(!success){
		c.status(411);
		return c.json({
			message: "Inputs are correct"
		})
	}
	const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
    try {
		const user =  await prisma.user.findFirst({
        where: {
            username: body.username,
            password: body.password
        }

	})
	if(!user){
		c.status(403);
        return c.text('Invalid  credentials')
	}
	const token = await sign({
		id: user.id
	},c.env.JWT_SECRET)

	return c.text("User logged in successfully: "+ token);
	} catch (error) {
		console.error("Error during signup:",error)
	}
})

