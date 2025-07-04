import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'react-toastify'
import { orderNow } from '@/http/AllRequestFromServer'
import SpinnerDemo from '@/components/customized/spinner/spinner-01'
import { clearCartItem } from '@/store/ProductSlice/ProductSlice'

const PaymentConfirm = ({ onPrevious }) => {

  const userState = useSelector(state => state.AuthSlice)
  const userCart = useSelector(state => state?.productSlice?.cartItem)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)



  const navigate = useNavigate()

  const handleOrderConfirm = async () => {
    setLoading(true)
    try {

      const productData = userCart?.map(item => ({
        productId: item._id,
        quantity: item.quantity
      }))

      const orderSchema = {
        products: productData,
        address: {
          country: userState?.user?.address?.country,
          city: userState?.user?.address?.city,
          homeAddress: userState?.user?.address?.homeAddress
        },
        phone: String(userState?.user?.phone)

      }

     const orderData = await orderNow(orderSchema)
      localStorage.removeItem("cart")
      dispatch(clearCartItem())
      navigate("/orders")
      setLoading(false)

    } catch (error) {
      setLoading(false)

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

  if (loading) {
    return (
      <>
        <SpinnerDemo />
      </>
    )
  }

  return (
    <>
      <div className='p-5 w-full @3xl:w-11/12 mx-auto'>
        <h1 className='text-2xl font-semibold capitalize'>Payment information</h1>

        <div className='flex flex-col-reverse gap-1 @5xl:flex-row justify-center items-center my-5'>
          <div className="w-11/12 @3xl:w-8/12 flex @5xl:w-1/2 h-72 text-black/70 @5xl:h-96 p-5 border-2 border-black/30">

            <div className='w-1/3 h-full flex flex-col justify-evenly text-xl font-semibold'>
              <h1>Name</h1>
              <h1>Email</h1>
              <h1>Phone</h1>
              <h1>Country</h1>
              <h1>city</h1>
              <h1>Address</h1>
            </div>
            <div className='w-[calc(100%-33.33%)] h-full flex flex-col justify-evenly text-xl'>
              <h1>{userState?.user?.firstname} {userState?.user?.firstname}</h1>
              <h1>{userState?.user?.email}</h1>
              <h1>{userState?.user?.phone}</h1>
              <h1>{userState?.user?.address?.country}</h1>
              <h1>{userState?.user?.address?.city}</h1>
              <h1>{userState?.user?.address?.homeAddress}</h1>
            </div>

          </div>
          <div className="w-11/12 @3xl:w-8/12 @5xl:w-1/2 h-72 @5xl:h-96 border-2 border-black/30">
            <iframe className='w-full h-full ' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28939.067488938446!2d66.95096451083984!3d24.953065799999987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb36b003f07a229%3A0xa2b8330f114419f8!2zR29oYXIgUmVzdGF1cmFudCDar9mI2r7YsSDYsduM2LPZudmI2LHbjNmG2bk!5e0!3m2!1sen!2s!4v1750771784383!5m2!1sen!2s" allowFullScreen={true} ></iframe>
          </div>
        </div>

        <div className='w-full my-5'>
          <h1 className='text-2xl font-semibold capitalize'>Delivery Method</h1>
          <RadioGroup defaultValue="COD" className="flex my-5">
            <div className="flex border-2 p-3 border-astro-green items-center gap-3">
              <RadioGroupItem id="cod" value="COD" />
              <Label htmlFor="cod" className="text-lg">Cash On Delivery {`(COD)`}</Label>
            </div>
          </RadioGroup>
        </div>

        <div className='my-8 flex justify-between'>
          <Button onClick={onPrevious} variant="secondary" ><ArrowLeft />Back to Shipping Info</Button>
          <Button onClick={handleOrderConfirm} className="bg-astro-green hover:bg-astro-light" >Confirm Order</Button>
        </div>
      </div>
    </>
  )
}

export default PaymentConfirm