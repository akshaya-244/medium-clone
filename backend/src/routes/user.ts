
import { Hono } from "hono";
//hono is our http library which doesnt run on Nodejs but runs on cloudfare workers
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign, decode, verify } from 'hono/jwt'
import { signupInput } from "@akshayamohan.2401/medium-common";
export const userRouter=new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
      }
}>();

userRouter.post('/signup', async(c) => {
    const body=await c.req.json();
    const {success}= signupInput.safeParse(body)
   if(!success)
    {
      c.status(411)
      return c.json({
        message: "Inputs are incorrect"
      })
    }
    const prisma= new PrismaClient({
      //We can globally access the env variables so we need to initialise it inside a function and accesss it using the c variable
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    try{
      
    const user=await prisma.user.create({
      data:{
        username: body.username,
        password: body.password,
        name: body.name,
  
      }
    })
   
    const jwt=await sign({
      id: user.id,
      name: user.name,
      username:user.username
    }, c.env.JWT_SECRET)
    return c.text(jwt)
    }
    catch(e){
      console.log(e)
      c.status(411);
  
      return c.text('Invalid')
    }
  
  })
  
  userRouter.post('/signin', async(c) => {
    const body=await c.req.json();
    const prisma= new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate())
  
    try{
      const user=await prisma.user.findFirst({
        where: {
          username: body.username,
          password: body.password,
        }, select :{
          id: true, 
          name: true,
          username:true
        }
      })
      if(!user){
        c.status(403)
        return c.text("Not Found")
      }
      const jwt=await sign({
        id: user.id,
        username:user.username,
        name : user.name
      }, c.env.JWT_SECRET)
  
      return c.text(jwt)
    }
    
    catch(e){
      c.status(411)
      return c.text('Invalid')
  
    }
    
  })
  
  