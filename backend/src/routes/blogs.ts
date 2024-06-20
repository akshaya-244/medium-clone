import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, verify } from "hono/jwt";
import { createBlogInput, signupInput } from "@akshayamohan.2401/medium-common";



export const blogRouter=new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET:string
    },
    Variables: {
        userId: string

    }
}>()


//Anytime there is a route which comes here we will first go to the use route
blogRouter.use('/*' ,async (c, next) => {
    const authHeader= c.req.header("authorization") || "";
    try{
         const user = await verify(authHeader, c.env.JWT_SECRET);
        if(user){
            
            //context c has auth req body but doesnt have userId so whatever extra variables u add to the context u mention it as Variables above 
            c.set("userId",user.id)
            await next();
        }
        else{
            c.status(403);
            return c.json({
                message: "You are not logged in"
            })
        }
    }
    catch(e){
        c.status(403)
        return c.json({
            message: "You are not logged in"
        })
    }
    
})

blogRouter.post('/',async (c) => {
    const body=await c.req.json();
    const {success}= createBlogInput.safeParse(body);
    if(!success)
    {
        return c.json({
            message: "Inputs are incorrect"
        })
    }
    const prisma=new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const userId=c.get("userId")

    const blog= await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(userId)
        }
    })

    return c.json({
        id: blog.id
    })
  })

blogRouter.put('/', async(c) => {
    const body=await c.req.json();
    const prisma=new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog=await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
        
    })
return c.json({
    id: blog.id
})
})

//Ypu should ideally do a pagination
blogRouter.get('/bulk', async(c) => {
    const prisma=new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blogs= await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });

    

    return c.json({
        blogs
    })
})
blogRouter.get('/:id', async(c) => {
    const id=c.req.param("id")
    const prisma=new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())

    const blog=await prisma.blog.findFirst({
        where: {
            id: Number(id)
        },
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
    return c.json({
        blog
    })
})


  
