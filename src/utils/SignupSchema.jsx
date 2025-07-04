import { z } from "zod/v3"


const SignupSchema = z.object({
    firstname: z.string().min(3,{ message: "firstname must be at least 3 characters." }).max(16),
    lastname: z.string().min(3,{ message: "lastname must be at least 3 characters." }).max(16),
    email: z.string().email({ message: "invalid email address" }),
    password: z.string().refine((val) => val.length > 5, { message: "password must be atleast 6 characters" })
})

export default SignupSchema