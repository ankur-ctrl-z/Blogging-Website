import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, jwt, sign, verify } from 'hono/jwt';
import { createBlogInput,updateBlogInput } from '@ankur-sharma/medium-common';
 

interface AppBindings {
  DATABASE_URL: string;
  JWT_SECRET: string;
}

interface AppVariables {
  userId: string; 
}
export const blogRouter = new Hono<
{
        Bindings: AppBindings,
        Variables: AppVariables
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || "";
    const token = authHeader.split(" ")[1] || authHeader;

    if (!token) {
        c.status(403);
        return c.json({ message: "Authentication required." });
    }

    try {
        const userPayload = await verify(token, c.env.JWT_SECRET) as { id: string | number };

        if (userPayload && (typeof userPayload.id === 'string' || typeof userPayload.id === 'number')) {
            c.set("userId", String(userPayload.id));
            await next();
        } else {
            c.status(403);
            return c.json({ message: "Invalid token." });
        }
    } catch (e) {
        c.status(403);
        return c.json({ message: "Authentication failed." });
    }
});


blogRouter.post('/',async(c)=> {
    const body = await c.req.json();
    const {success} = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs not correct"
        })
    }
    const authorId = c.get("userId")
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
 
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    })
    return c.json({
        id : blog.id
    })
})

blogRouter.put('/',async(c)=> {
    const body = await c.req.json();
    const {success} = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411); 
        return c.json({
            message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })
    return c.json({
        id : blog.id
    })
})


blogRouter.get('/bulk',async(c)=> {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.blog.findMany();
        return c.json({
            blogs
    })
    } catch (error) {
        c.status(411);
        return c.json({
            message: "Error while fetching all blog post"
        });
    }   
})


blogRouter.get('/:id',async(c)=> {
    const blogId = c.req.param('id');
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blog = await prisma.blog.findFirst({
        where: {
            id: Number(blogId)
        }
    })
    if (!blog) {
            c.status(404);
            return c.json({ message: "Blog post not found." });
    }
    return c.json({
        blog
    })
    } catch (error) {
        c.status(411);
        return c.json({
            message: "Error while fetching blog post"
        });
    }   
})