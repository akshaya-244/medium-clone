import z from "zod";


//This is a runtime variable it gets used when the body is formed in the backend
export const signupInput=z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()

})

//If you just want the types of the variables username, password, etc
//This is again initialised in the backend so difficult for the frontend developer so we need to make a commons folder 
export type SignupInput=z.infer<typeof signupInput>

//This is a runtime variable it gets used when the body is formed in the backend
export const signinInput=z.object({
    username: z.string().email(),
    password: z.string().min(6),

})

//If you just want the types of the variables username, password, etc
//This is again initialised in the backend so difficult for the frontend developer so we need to make a commons folder 
export type SigninInput=z.infer<typeof signinInput>

export const createBlogInput=z.object({
    title: z.string(),
    content: z.string()
})
export type CreateBlogInput=z.infer<typeof createBlogInput>

export const updateBlogInput=z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()

})
export type UpdateBlogInput=z.infer<typeof updateBlogInput>
