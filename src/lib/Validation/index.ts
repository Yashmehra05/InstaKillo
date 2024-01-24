import * as z from "zod"
export const SignupValidation = z.object({
    name: z.string().min(2,{message:'Not correct'}),
    username: z.string().min(2,{message:'Nahi Bhai change kar'}),
    email: z.string().email(),
    password: z.string().min(8,{message:'Password 8 tak ka dal liyo'}),

  })

  export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8,{message:'Password 8 tak ka dal na yar'}),

  })