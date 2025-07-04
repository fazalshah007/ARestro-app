import { z } from "zod/v3"


const LoginSchema = z.object({

    email: z.string().email({ message: "invalid email address" }),
    password: z.string().refine((val) => val.length > 5, { message: "password must be atleast 6 characters" })
})

export default LoginSchema