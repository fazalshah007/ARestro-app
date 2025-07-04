import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import logo from "@/assets/images/logo.png"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import LoginSchema from "@/utils/LoginSchema"
import { loginWithEmailAndPassword } from "@/http/AllRequestFromServer";
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { loginUser } from "@/store/AuthSlice/AuthSlice"
import { setRefreshToken } from "@/utils/RefreshTokenSet"


export function LoginForm({ className, ...props }) {

  const dispatch = useDispatch();


  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })



  const onSubmit = async (values) => {
    try {
      const user = await loginWithEmailAndPassword(values)
      
      dispatch(loginUser(user.data))
      setRefreshToken(user.data.refreshToken)
      

    } catch (error) {
      toast.error(`${error?.response?.data?.message}`, {
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
        <h1 className="font-bold text-2xl @md:text-4xl">Log In</h1>
      </div>
      {/* form section  */}
      <div className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>

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
              <Button className=" bg-astro-green hover:bg-astro-light text-lg capitalize" type="submit" >Login</Button>
              <Link className="hover:underline hover:text-astro-green" to="/signup">Create an account</Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
