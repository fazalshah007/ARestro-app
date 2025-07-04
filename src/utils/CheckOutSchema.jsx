import { z } from "zod/v3"


const CheckOutSchema = z.object({
    phone: z
        .string()
        .min(12, { message: "Phone must be 12 digits" }).max(12,{message:"Phone must be 12 digits only"})
        .regex(/^[0-9]+$/, { message: "Phone must be numeric" }),

    address: z.object({
        country: z.string().min(2, { message: "Country is required" }),
        city: z.string().min(2, { message: "City is required" }),
        homeAddress: z.string().min(5, { message: "Home address is required" }),
    }),
})

export default CheckOutSchema