import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import logo from "@/assets/images/logo.png"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import SignupSchema from "@/utils/SignupSchema"
import { toast } from "react-toastify"
import { registerWithEmailAndPassword } from "@/http/AllRequestFromServer"

export function SignupForm({ className, ...props }) {

  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values) => {
    try {

       const user = await registerWithEmailAndPassword(values)
        
        navigate("/login")
      
    } catch (error) {

      toast.error(`${error.response.data.message}`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
      
    }


  }

  return (
    <div className={cn("flex flex-col gap-6  items-center", className)} {...props}>
      {/* image div  */}
      <div className="size-1/4">
        <img src={logo} alt="" />
      </div>
      {/* heading  */}
      <div>
        <h1 className="font-bold text-2xl @md:text-4xl">Create an account</h1>
      </div>
      {/* form section  */}
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>


            <div className="flex justify-between gap-8">
              {/* ------------------------------First Name----------------------------------- */}

              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem
                    className="w-full"
                  >
                    <FormLabel className="text-lg mt-5" >First Name</FormLabel>
                    <FormControl>
                      <Input type="text" className="py-6" placeholder="enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* ------------------------------------------------------------------------------ */}

              {/* ---------------------------------Last Name----------------------------------- */}
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem
                    className="w-full"
                  >
                    <FormLabel className="text-lg mt-5" >Last Name</FormLabel>
                    <FormControl>
                      <Input type="text" className="py-6" placeholder="enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* ------------------------------------------------------------------------------ */}
            </div>
            {/* -------------------------------Email-------------------------------------- */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg mt-5" >Email</FormLabel>
                  <FormControl>
                    <Input type="text" className="py-6" placeholder="enter your email here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ------------------------------------------------------------------------------ */}

            {/* ---------------------------Password------------------------------------ */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg mt-5" >Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="py-6" placeholder="enter password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* ------------------------------------------------------------------------------ */}
            <div className="flex justify-between mt-8">
              <Button className=" bg-astro-green hover:bg-astro-light text-lg capitalize" type="submit" >submit</Button>
              <Link className="hover:underline hover:text-astro-green" to="/login">already have an account</Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
