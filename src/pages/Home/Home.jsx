import logo from "@/assets/images/logo.png"
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious

} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import bg1 from "../../assets/images/bg-1.png"
import bg2 from "../../assets/images/bg-2.png"
import bg3 from "../../assets/images/bg-4.png"
import { Badge } from "@/components/ui/badge"
import AllProducts from "../Products/AllProducts"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ContactEmail } from "../index"


const Home = ({ products }) => {

  const allProducts = products?.slice(0, 4)

  const categories = [...new Set(allProducts?.map(item => item.category))]


  const imageArr = [
    {
      coverImg: bg1
    },
    {
      coverImg: bg2
    },
    {
      coverImg: bg3
    },
  ]

  return (
    <>
      <header className='@container/header'>
        <nav className='@3xl:hidden w-[95%] mx-auto flex items-center justify-between p-3'>
          <div className="w-10 flex items-center">
            <img src={logo} className="w-full h-full mr-3" alt="" />
            <h1 className="text-gray-700 font-bold">ARestro</h1>
          </div>
          <div className="w-6/12 border-2 border-astro-green rounded-md flex items-center p-2 ">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#009944"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
            <input type="text" className="w-full h-full border-transparent outline-none" placeholder="Search" />
          </div>
        </nav>
      </header>
      <div className='@container/home min-h-screen'>
        <Carousel
          plugins={[
            Autoplay({
              delay: 3000
            })
          ]}
          className="w-full h-full">
          <CarouselContent>
            {
              imageArr.map((item, index) => (
                <CarouselItem className="basic-1/2" key={index}>
                  <div className="w-screen h-full @md:h-[50vh] @3xl:h-screen">
                    <img className="w-full h-full object-cover object-center" src={item.coverImg} alt="" />
                  </div>
                </CarouselItem>
              ))
            }
          </CarouselContent>
        </Carousel>


        {/* categories section  */}
        <div className="z-50">
          <h1 className="@3xl:text-5xl @md:text-3xl text-xl text-center my-5 @3xl:my-8">Categories</h1>
          {/* badghes render with carousel  */}
          <div className="flex justify-center">
            <Carousel className="w-8/12 @md:w-1/3 my-5">
              <CarouselContent className="-ml-1">
                {categories?.map((item, index) => (
                  <CarouselItem key={index} className="basis-auto">
                    <Link to={`/products?category=${item}&page=${1}`}>
                      <Badge className="@lg:text-lg hover:bg-astro-green hover:text-white" variant="secondary" >
                      {item}
                    </Badge>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

        </div>

        {/* featured products section  */}

        <h1 className="@3xl:text-5xl @md:text-3xl text-xl text-center my-5 @3xl:my-8">Featured Products</h1>
                <div>

                <AllProducts products={allProducts}/>
                <div className="my-8 ml-8">
                <Link className="bg-astro-green py-2 px-4 uppercase text-white font-semibold" to="/products">see all</Link>

                </div>
                </div>

                {/* newsletter section  */}
                <div className="w-full h-72 bg-slate-100 my-16 flex flex-col justify-center items-center">
                <h1 className="text-xl @xl:text-2xl @3xl:text-4xl">Enter Email For Newsletter</h1>
                <div className="@5xl:w-1/2 h-12 flex mt-10">
                  <input type="text" className="w-full h-full p-3 border-2 border-black/20 outline-none text-lg" placeholder="enter email" />
                  <Button className="h-full rounded-none bg-astro-green text-white hover:bg-astro-light">Subscribe</Button>
                </div>

                </div>
                <div id="contact">
                  <ContactEmail />
                </div>
                {/* footer section  */}

                <div className="hidden w-full h-16 bg-astro-green @3xl:flex justify-center items-center">
                  <h1 className="text-xl text-white font-semibold"><span>©</span>copyright reserved <span>AStro Food App and developed by <a className="underline text-gray-800" target="_blank" href="https://github.com/fazalshah007">Fazal Shah</a></span></h1>
                </div>
        {/* home page all sections are created in inner on their div  */}
      </div>
    </>
  )
}

export default Home