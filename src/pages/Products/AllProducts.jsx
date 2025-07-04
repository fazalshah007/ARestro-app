import SpinnerDemo from '@/components/customized/spinner/spinner-01'
import { getAllProducts } from '@/http/AllRequestFromServer'
import { categoryWiseProducts, fetchedAllProducts } from '@/store/ProductSlice/ProductSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'

const AllProducts = ({ products }) => {

    const dispatch = useDispatch()

    const [ loading, setLoading ] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const category = searchParams.get("category")
    const page = searchParams.get("page")

    useEffect(() => {

        ; (async () => {
            setLoading(true)
            try {

                if (category && page) {
                    const allProducts = await getAllProducts(category, page)
                    dispatch(categoryWiseProducts(allProducts.data.data))
                    setLoading(false)
                } else {
                    const allProducts = await getAllProducts()
                    dispatch(fetchedAllProducts(allProducts.data.data))
                    setLoading(false)

                }

            } catch (error) {
                console.log(error);
                    setLoading(false)


            }
        })()
    }, [category])


    if(loading){
        return(
            <SpinnerDemo />
        )
    }

    return (
        <div className='@container/products'>

            <div className="w-11/12 mt-24 mx-auto place-items-center grid grid-cols-1 gap-3.5 @lg:grid-cols-2 @3xl:grid-cols-3 @6xl:grid-cols-4">
                {
                    products?.map((item, index) => (
                        <Link to={`/product/${item._id}`} key={index}>
                            <div className="w-80 p-3 bg-[#F1F5F9] rounded-lg">
                                <div className="w-full h-44 @3xl:h-64 ">
                                    <img className="w-full h-full overflow-hidden rounded-lg object-cover object-center" src={item.imageURL} alt="" />
                                </div>
                                <h1 className="mt-3 text-xl font-semibold text-gray-600">Rs: {item.price}/=</h1>
                                <h1 className="mt-3 text-2xl font-semibold">{item.title}</h1>
                                <h1 className="mt-3 text-md text-gray-500">{item.description.slice(0, 50)}...</h1>
                            </div>
                        </Link>

                    ))
                }
            </div>
        </div>
    )
}

export default AllProducts