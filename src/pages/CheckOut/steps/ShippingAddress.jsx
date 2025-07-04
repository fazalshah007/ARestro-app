import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, LoaderCircle } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CheckOutSchema from '@/utils/CheckOutSchema'
import { updateUserData } from '@/http/AllRequestFromServer'
import { userDataFromServer } from '@/store/AuthSlice/AuthSlice'

const ShippingAddress = ({ onNext, onPrevious }) => {

    const userState = useSelector(state => state.AuthSlice)
    const dispatch = useDispatch()

    const [ btnLoading, setBtnLoading ] = useState(false)
    const [ responseData, setResponseData] = useState(null)

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(CheckOutSchema),
        defaultValues: {
            phone: userState?.user?.phone || "",
            country: userState?.user?.address?.country || "",
            city: userState?.user?.address?.city || "",
            homeAddress: userState?.user?.address?.homeAddress || "",
        }
    })

    useEffect(()=>{
        if(userState.user){
            reset({
        phone: userState.user?.phone && String(userState.user?.phone) || "",
        address: {
          country: userState.user?.address?.country || "",
          city: userState.user?.address?.city || "",
          homeAddress: userState.user?.address?.homeAddress || "",
        }
      })
        }
    },[userState.user, reset])

    useEffect(() => {

        if(responseData?.status === 200){
            dispatch(userDataFromServer(responseData?.data))
            setBtnLoading(false)
            return onNext()
        }

    },[responseData?.data?.isLoggedIn])

    const onSubmit = async (values) => {
        setBtnLoading(true)
        try {

            if(userState?.user?.phone || userState?.user?.address?.country || userState?.user?.address?.city || userState?.user?.address?.homeAddress){
                 onNext()
                 setBtnLoading(false)
                 return
            }

            const response = await updateUserData(values)
            
            setResponseData(response)
            

        } catch (error) {
            console.log(error);
            setBtnLoading(false)

        }

    }



    return (
        <>
            <div className='p-5 w-full @3xl:w-11/12 mx-auto'>
                <h1 className='text-2xl font-semibold capitalize'>Shipping Address</h1>
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
                <div className='mt-8 flex justify-between'>
                    <Button onClick={onPrevious} variant="secondary" ><ArrowLeft /> Back to Personal Info</Button>
                    {
                        btnLoading ? (
                            <Button disabled={btnLoading} className="bg-astro-green" ><LoaderCircle className='animate-spin' /> Please wait</Button>
                        ) : (
                            <Button onClick={handleSubmit(onSubmit)} className="bg-astro-green hover:bg-astro-light" >Next <ArrowRight /></Button>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default ShippingAddress