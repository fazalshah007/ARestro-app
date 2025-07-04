import { z } from "zod";


const ProductSchema = z.object({
  description: z.string().min(3,{message: "Description is required!"}),
  name: z.string().min(3,{message: "product name is required!"}),
  price: z.string()
  .min(2,{message: "Price must be 2 digits or above!"})
  .regex(/^[0-9]+$/, { message: "Price must be numeric" }),
});

export default ProductSchema;
