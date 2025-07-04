import { getOrders } from '@/http/AllRequestFromServer';
import React, { useEffect, useState } from 'react'
import OrdersTable from './OrdersTable';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SpinnerDemo from '@/components/customized/spinner/spinner-01';

const Orders = () => {

  const navigate = useNavigate()

  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ; (async () => {
      setLoading(true)

      try {

        const allOrders = await getOrders()
        setOrders(allOrders?.data?.data)
      setLoading(false)


      } catch (error) {
      setLoading(false)

        console.log(error);

      }
    })();
  }, [])

  if(loading){
    return(
      <>
      <SpinnerDemo />
      </>
    )
  }

  return (
    <div className='@container/orders flex flex-col justify-end min-h-screen'>
      <div className='w-full min-h-screen @3xl:min-h-[calc(100vh-10vh)]'>
        {
          orders.length !== 0 && orders !== undefined ? (<OrdersTable orders={orders} />) : (
            <>
            <div className='grid w-full h-full place-items-center'>
              <div className='flex flex-col justify-center items-center'>
                <h1 className='text-2xl @3xl:text-4xl @5xl:text-5xl text-black/50'>Your Order is Empty!</h1>
              <Button onClick={() => navigate("/products")} className="bg-astro-green hover:bg-astro-light text-xl mt-5">Order Now</Button>
              </div>
            </div>
            </>
          )
        }

      </div>
    </div>
  )
}

export default Orders