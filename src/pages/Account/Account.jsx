import React, { useEffect, useState } from 'react'
import avatar from "@/assets/images/user-avatar.png"
import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CheckOutSchema from '@/utils/CheckOutSchema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { updateUserData } from '@/http/AllRequestFromServer'
import { userDataFromServer } from '@/store/AuthSlice/AuthSlice'
import { LoaderCircle } from 'lucide-react'

const Account = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userState = useSelector(state => state?.AuthSlice)

  const [toggle, setToggle] = useState(false)
  const [response, setResponse] = useState({})
  const [btnLoading, setBtnLoading] = useState(false)
  
  const { register, handleSubmit,  formState: { errors } } = useForm({
        resolver: zodResolver(CheckOutSchema),
        defaultValues: {
            phone: userState?.user?.phone || "",
            country: userState?.user?.address?.country || "",
            city: userState?.user?.address?.city || "",
            homeAddress: userState?.user?.address?.homeAddress || "",
        }
    })



  useEffect(() => {

    if(response.status === 200){
        dispatch(userDataFromServer(response?.data))
        navigate("/account")
        return
      }

    if(!userState?.user?.phone || !userState?.user?.address?.city || !userState?.user?.address?.country || !userState?.user?.address?.homeAddress){
      
      setToggle(false)
    }else{
      setToggle(true)

    }

  },[userState?.isAuthUser, response.status === 200])

  const onSubmit = async (values) => {
    setBtnLoading(true)

    try {

      const updateuser = await updateUserData(values)
      setResponse(updateuser)

      setBtnLoading(false)
      
    } catch (error) {
      setBtnLoading(false)
      console.log(error);
    }
    
  }


  return (
    <div className='@container/account'>
      <div className='w-11/12 mx-auto min-h-screen @3xl:flex @3xl:items-end'>
        <div className='w-full min-h-[calc(100vh-10vh)] py-24 @3xl:py-8'>


           <div className="@5xl:w-9/12 @7xl:w-8/12  mx-auto px-8 py-5 rounded-4xl border-2 shadow-2xl shadow-black/20">
            <div className='size-56 rounded-full mx-auto'>
              <img className='w-full h-full object-center object-cover' src={avatar} alt="avatar-iamge" />
            </div>
            <h1 className='text-center text-3xl font-bold mt-2 tracking-widest'>@{userState?.user?.firstname} {userState?.user?.lastname}</h1>
            <div className='mt-5'>
              <h1 className=' text-xl mt-2 font-semibold'>Name</h1>
              <h1 className=' text-md tracking-widest mt-2'>{userState?.user?.firstname} {userState?.user?.lastname}</h1>
            </div>
            <div className='mt-5'>
              <h1 className=' text-xl mt-2 font-semibold'>Email</h1>
              <h1 className=' text-md tracking-widest mt-2'>{userState?.user?.email}</h1>
            </div>
            {
              userState?.user?.phone && userState?.user?.address?.city && userState?.user?.address?.country && userState?.user?.address?.homeAddress ? (
                <>
                  <div className='mt-5'>
                    <h1 className=' text-xl mt-2 font-semibold'>Phone</h1>
                    <h1 className=' text-md tracking-widest mt-2 text-blue-700'>+{userState?.user?.phone}</h1>
                  </div>
                  <div className='mt-5'>
                    <h1 className=' text-xl mt-2 font-semibold'>Address</h1>
                    <h1 className=' text-md tracking-widest mt-2'>{userState?.user?.address?.homeAddress} {userState?.user?.address?.city},{userState?.user?.address?.country}</h1>
                  </div>
                </>
              ) : (
                toggle && (
                   <div className='w-full h-full'>
              <div className='grid gap-5 place-items-center grid-cols-1 @3xl:grid-cols-2'>
                    <div className='w-full mt-5'>
                        <Label className="text-lg mb-2 font-light" htmlFor="phone" >Phone No</Label>
                        <Input placeholder="923*********" {...register("phone")} id="phone"  type="text" className={`p-5 border-2 focus-visible:border-0 focus-visible:ring-astro-light ${errors.phone && "ring-2 ring-red-500"}`} />
                        {errors.phone && <p className="text-red-500 font-medium text-sm mt-2">{errors.phone.message}</p>}
                    </div>
                    <div className='w-full mt-5'>
                        <Label className="text-lg mb-2 font-light" htmlFor="country" >Country</Label>
                        <Input placeholder="enter country" {...register("address.country")} id="country" type="text" className={`p-5 border-2 focus-visible:border-0 focus-visible:ring-astro-light ${errors.address?.country && "ring-2 ring-red-500"}`} />
                        {errors.address?.country && <p className="text-red-500 font-medium text-sm mt-2">{errors.address.country.message}</p>}
                    </div>
                    <div className='w-full mt-5'>
                        <Label className="text-lg mb-2 font-light" htmlFor="city" >City</Label>
                        <Input placeholder="enter city" {...register("address.city")} id="city" type="text" className={`p-5 border-2 focus-visible:border-0 focus-visible:ring-astro-light ${errors.address?.city && "ring-2 ring-red-500"}`} />
                        {errors.address?.city && <p className="text-red-500 font-medium text-sm mt-2">{errors.address.city.message}</p>}
                    </div>
                    <div className='w-full mt-5 @3xl:col-span-2'>
                        <Label className="text-lg mb-2 font-light" htmlFor="address" >Address</Label>
                        <Input placeholder="address" {...register("address.homeAddress")} id="address" type="text" className={`p-5 border-2 focus-visible:border-0 focus-visible:ring-astro-light ${errors.address?.homeAddress && "ring-2 ring-red-500"}`} />
                        {errors.address?.homeAddress && <p className="text-red-500 font-medium text-sm mt-2">{errors.address?.homeAddress.message}</p>}
                    </div>

                </div>
            </div>
                )
              )
             
            }

           

            <div className="w-full mt-5 @3xl:mt-5">
              {
                userState?.user?.phone && userState?.user?.address?.city && userState?.user?.address?.country && userState?.user?.address?.homeAddress ? ("") : (
                  toggle ? (
                    <Button onClick={handleSubmit(onSubmit)} className="w-full inline-block text-md bg-astro-green hover:bg-astro-light">{btnLoading ? (<><LoaderCircle className='animate-spin' /> please Wait</>) : ("Submit Now")}</Button>
                  ) : (
                    <Button onClick={() => setToggle(true)} className="w-full text-md bg-astro-green hover:bg-astro-light">Edit Profile</Button>
                  )
                   
                )
              }
              
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Account