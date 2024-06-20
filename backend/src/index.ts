import { Hono } from 'hono'
//hono is our http library which doesnt run on Nodejs but runs on cloudfare workers
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, decode, verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blogs'
import { cors } from 'hono/cors'
//INDEX.TS picks up the db from wrangler.toml where prisma (connection pool) is present

//When u call npx prisma generate it gives u a library which make writin code easy like USer.update , User.post
//you can do import {User} from @prisma/client





const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>() ;
app.use('/*', cors());
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);


// app.post('/api/v1/user/signup', async(c) => {
//   const body=await c.req.json();

//   const prisma= new PrismaClient({
//     //We can globally access the env variables so we need to initialise it inside a function and accesss it using the c variable
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate())

//   try{
    
//   const user=await prisma.user.create({
//     data:{
//       username: body.username,
//       password: body.password,
//       name: body.name,

//     }
//   })

//   const jwt=await sign({
//     id: user.id
//   }, c.env.JWT_SECRET)
//   return c.text(jwt)
//   }
//   catch(e){
//     console.log(e)
//     c.status(411);

//     return c.text('Invalid')
//   }

// })

// app.post('/api/v1/user/signin', async(c) => {
//   const body=await c.req.json();
//   const prisma= new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL
//   }).$extends(withAccelerate())

//   try{
//     const user=await prisma.user.findFirst({
//       where: {
//         username: body.username,
//         password: body.password,
//       }
//     })
//     if(!user){
//       c.status(403)
//       return c.text("Not Found")
//     }
//     const jwt=await sign({
//       id: user.id
//     }, c.env.JWT_SECRET)

//     return c.text(jwt)
//   }
  
//   catch(e){
//     c.status(411)
//     return c.text('Invalid')

//   }
  
// })

export default app
