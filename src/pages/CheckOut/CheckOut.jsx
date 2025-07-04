import React, { useState } from 'react'
import PersonalInfo from './steps/PersonalInfo';
import ShippingAddress from './steps/ShippingAddress';
import PaymentConfirm from './steps/PaymentConfirm';
import { ArrowLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CheckOut = () => {

  const navigate = useNavigate()

  const [steps, setSteps] = useState(1);
  
  const [complete, setComplete] = useState(false);

  // complete && navigate("/complete")

  const stepScreens = ["Personal Info", "Shipping Address", "Payment"];

  const components = {
    1: PersonalInfo,
    2: ShippingAddress,
    3: PaymentConfirm
  }

  const Step = components[steps]

  const onNext = () => {
    steps === stepScreens.length
      ? setComplete(true)
      : setSteps((prev) => prev + 1);

  }

  const onPrevious = () => {
    setSteps((prev) => prev - 1);

  }


  return (
    <>
      <div className='@container/checkout'>
        <Button onClick={() => navigate(-1)} variant="ghost" className=' m-5 hover:bg-astro-light text-lg hover:text-white'><ArrowLeft /> Back</Button>
        <div className="flex gap-10 p-5">
          <div className='flex justify-between'>
            {
              stepScreens?.map((item, index) => (
                <div key={index}
                  className={`step-item ${steps === index + 1 && "active"} ${(index + 1 < steps || complete) && "complete"
                    } `}
                >
                  <div className="step">
                    <span className={`${steps === index + 1 && "text-white"} ${(index + 1 < steps || complete) && "text-white"}`}>{index + 1 < steps || complete ? <Check size={24} /> : index + 1}</span>
                  </div>
                  <p className="text-black/70">{item}</p>
                </div>
              ))
            }

          </div>
        </div>
        {/* stepper render component  */}
        <div>
          {Step && <Step onNext={onNext} onPrevious={onPrevious} />}
        </div>

      </div>
    </>
  )
}

export default CheckOut