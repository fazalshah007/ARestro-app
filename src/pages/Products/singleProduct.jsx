import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleProduct } from '@/http/AllRequestFromServer'
import SpinnerDemo from '@/components/customized/spinner/spinner-01'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/store/ProductSlice/ProductSlice'
import { NotFound } from '../'

const singleProduct = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedSizeOption, setSelectedSizeOption] = useState(null);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    ;(async() => {
      setLoading(true)
      try {
        
        const singleProduct = await getSingleProduct(id)
        console.log(singleProduct);
        
        setProduct(singleProduct.data)
        setLoading(false)
        
      } catch (error) {
        console.log(error);
        if(error.status === 400){
          setProduct(null)
        }
        setLoading(false)
      }
    })()
  },[])
  

  const handleCart =({ data }) => {

    
    const cartSchema = {
       _id: data._id,
    title: data.title,
    category: data.category,
    description: data.description,
    price: data.price,
    imageURL: data.imageURL,
    selectedToppings: selectedToppings && [...selectedToppings],
    selectedSize:  selectedSizeOption ? (selectedSizeOption && {...selectedSizeOption}) : (data?.sizeOptions[0]),
    quantity: Number(quantity),
    }

    dispatch(addToCart(cartSchema))
    navigate("/cart")

  }

 
  const handleToggle = (topping, checked) => {

    if (checked) {
      setSelectedToppings((prev) => [...prev, topping]);
    } else {
      setSelectedToppings((prev) =>
        prev.filter((item) => item._id !== topping._id)
      );
    }
  };

  // console.log(product);

  if(loading){
    return(
      <SpinnerDemo />
    )
  }

  if(!product){
    return (
      <NotFound />
    )
  }
  

  return (
    <>
      <div className='@container/singleProduct'>
        <div className='w-full min-h-screen mb-16 @3xl:mb-0 flex flex-col @5xl:flex-row items-end'>
          <div className='w-full @5xl:w-1/2 h-[calc(100vh-20vh)] @5xl:min-h-[calc(100vh-100px)] flex justify-center items-center p-5'>
            <img className='w-full h-full object-cover object-center rounded-2xl' src={product?.data?.imageURL} alt="" />
          </div>
          <div className='w-full @5xl:w-1/2 h-[calc(100vh-20vh)] @5xl:min-h-[calc(100vh-100px)] p-5'>
            <div className='flex flex-col justify-between h-full'>
              <h1 className='text-4xl @xl:text-6xl font-bold tracking-wide capitalize'>{product?.data?.title}</h1>
              <h1 className='text-4xl text-black/50 mt-5 font-semibold'>{product?.data?.price}/=</h1>
              <div>
                <h1 className="text-xl font-semibold">Size</h1>
                <div>
                  <RadioGroup onValueChange={(value) => setSelectedSizeOption(value)} className="flex mt-5">
                    {
                    product?.data?.sizeOptions?.map((item) => (
                      <div key={item?._id} className="flex border p-2 hover:border-astro-green items-center gap-3">
                      <RadioGroupItem value={item}  id={item?._id} />
                      <Label htmlFor={item?._id} className="text-md" >{item?.name}</Label>
                    </div>
                    ))
                    }
                  </RadioGroup>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold">Extra</h1>
                <div>
                  {/* --------------------------------- real ----------------------------------------------------------------- */}
                  {
                    product?.data?.toppings?.map((toppings) => {
                      return <Label key={toppings?._id} className="mt-3 hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-astro-green has-[[aria-checked=true]]:bg-astro-green/20">
                        <Checkbox
                          onCheckedChange={(checked) => handleToggle(toppings, checked)}
                          value={toppings?.name}
                          id={toppings?._id}
                          className="data-[state=checked]:border-astro-green data-[state=checked]:bg-astro-green data-[state=checked]:text-white"
                        />
                        <div className="font-normal">
                          <p className="text-lg leading-none font-medium">
                            {toppings?.name}
                          </p>
                        </div>
                      </Label>
                    })
                  }

                  {/* --------------------------------- real ----------------------------------------------------------------- */}
                </div>
              </div>
              <div>
                <h1 className="text-xl mb-5 font-semibold">Quantity</h1>
                <Select
                 onValueChange={(value) => setQuantity(value)}
                 >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="select quantity"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button onClick={() => handleCart(product)} className="w-full p-5 text-lg bg-astro-green hover:bg-astro-light cursor-pointer" >Add to cart</Button>
              </div>
            </div>
          </div>
        </div>
        <h1 className='m-5 text-4xl font-semibold'>Description</h1>
        <h1 className='mb-20 m-5 @3xl:mb-0 text-xl'>{product?.data?.description}</h1>

      </div>
    </>
  )
}

export default singleProduct