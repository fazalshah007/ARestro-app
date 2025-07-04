import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PersonalInfo = ({onNext}) => {

    const userState = useSelector(state => state.AuthSlice)
    const navigate = useNavigate()
    

  return (
   <>
     <div className='p-5 w-full @3xl:w-11/12 mx-auto'>
        <h1 className='text-2xl font-semibold capitalize'>Personal information</h1>
        <div className='grid gap-5 place-items-center grid-cols-1 @3xl:grid-cols-2'>
            <div className='w-full mt-5'>
                <Label className="text-lg mb-2 font-light" htmlFor="firstname" >First Name</Label>
                <Input value={userState.user?.firstname} disabled={true} id="firstname" type="text" className="p-5 border-2 focus-visible:border-0 focus-visible:ring-astro-light" />
            </div>
            <div className='w-full mt-5'>
                <Label className="text-lg mb-2 font-light" htmlFor="lastname" >Last Name</Label>
                <Input value={userState.user?.lastname} disabled={true} id="lastname" type="text" className="p-5 border-2 focus-visible:border-0 focus-visible:ring-astro-light" />
            </div>
            <div className='w-full mt-5 @3xl:col-span-2'>
                <Label className="text-lg mb-2 font-light" htmlFor="email" >Email</Label>
                <Input value={userState.user?.email} disabled={true} id="email" type="text" className="p-5 border-2 focus-visible:border-0 focus-visible:ring-astro-light" />
            </div>

        </div>
        <div className='mt-8 flex justify-between'>
        <Button onClick={() => navigate("/products")} variant="secondary" ><ArrowLeft /> Return To Shop</Button>
        <Button onClick={onNext} className="bg-astro-green hover:bg-astro-light" >Next <ArrowRight /></Button>

        </div>
    </div>
   </>
  )
}

export default PersonalInfo