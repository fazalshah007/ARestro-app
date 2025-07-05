import { z } from "zod/v3"


const ContactSchema = z.object({
    fullname: z
        .string()
        .min(3, { message: "please enter your full name" }),

    email: z
        .string()
        .email({ message: "please enter your valid email adrress" }),

    subject: z
        .string()
        .min(3, { message: "please enter subject what you want!" }),

    message: z
        .string()
        .min(3, { message: "please drop your message here..." }),

})

export default ContactSchema;