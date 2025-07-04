import SpinnerDemo from '@/components/customized/spinner/spinner-01';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSingleOrder } from '@/http/AllRequestFromServer';
import { ArrowLeft, Calendar, CreditCard, Mail, MapPin, Package, Phone, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

// const orderData = [
//     {
//         _id: "686360b8323b5155c6d696b8",
//         status: "delivered",
//         totalPrice: 900,
//         paymentMethod: "COD",
//         address: {
//             city: "lahore",
//             country: "pakistan",
//             homeAddress: "house No 448 near punjab chorangi",
//         },
//         user: {
//             _id: "68635eb8323b5155c6d6961b",
//             firstname: "sadiq",
//             lastname: "ahmed",
//             email: "sadiq@gmail.com",
//             phone: 923482851439,
//         },
//         products: [
//             {
//                 quantity: 3,
//                 product: {
//                     _id: "685ff9e5d3d8f5ab09c56fae",
//                     title: "Sandwitch",
//                     category: "small sandwitch",
//                     description:
//                         "Sure, a ham sandwich isn't normally a thing to write home about. It's a fall-back lunch for most delicious sandwitch",
//                     price: 300,
//                     imageURL:
//                         "https://res.cloudinary.com/dkbyh8wjz/image/upload/v1751120356/ARestro-Restaurant-Product/zymtr3stmfdqfpet8idt.jpg",
//                     sizeOptions: [
//                         { name: "small", price: 300, _id: "685ff9e5d3d8f5ab09c56fb2" },
//                         { name: "madium", price: 350, _id: "685ff9e5d3d8f5ab09c56fb3" },
//                         { name: "large", price: 400, _id: "685ff9e5d3d8f5ab09c56fb4" },
//                     ],
//                     toppings: [
//                         { name: "extra cheese", price: 50, _id: "685ff9e5d3d8f5ab09c56faf" },
//                         { name: "extra spicy", price: 20, _id: "685ff9e5d3d8f5ab09c56fb0" },
//                         { name: "extra meat", price: 30, _id: "685ff9e5d3d8f5ab09c56fb1" },
//                     ],
//                     createdAt: "2025-06-28T14:19:17.111Z",
//                     updatedAt: "2025-06-28T14:19:17.111Z",
//                 },
//             },
//             {
//                 quantity: 3,
//                 product: {
//                     _id: "685ff9e5d3d8f5ab09c56fae",
//                     title: "Sandwitch",
//                     category: "small sandwitch",
//                     description:
//                         "Sure, a ham sandwich isn't normally a thing to write home about. It's a fall-back lunch for most delicious sandwitch",
//                     price: 300,
//                     imageURL:
//                         "https://res.cloudinary.com/dkbyh8wjz/image/upload/v1751120356/ARestro-Restaurant-Product/zymtr3stmfdqfpet8idt.jpg",
//                     sizeOptions: [
//                         { name: "small", price: 300, _id: "685ff9e5d3d8f5ab09c56fb2" },
//                         { name: "madium", price: 350, _id: "685ff9e5d3d8f5ab09c56fb3" },
//                         { name: "large", price: 400, _id: "685ff9e5d3d8f5ab09c56fb4" },
//                     ],
//                     toppings: [
//                         { name: "extra cheese", price: 50, _id: "685ff9e5d3d8f5ab09c56faf" },
//                         { name: "extra spicy", price: 20, _id: "685ff9e5d3d8f5ab09c56fb0" },
//                         { name: "extra meat", price: 30, _id: "685ff9e5d3d8f5ab09c56fb1" },
//                     ],
//                     createdAt: "2025-06-28T14:19:17.111Z",
//                     updatedAt: "2025-06-28T14:19:17.111Z",
//                 },
//             },
//             {
//                 quantity: 3,
//                 product: {
//                     _id: "685ff9e5d3d8f5ab09c56fae",
//                     title: "Sandwitch",
//                     category: "small sandwitch",
//                     description:
//                         "Sure, a ham sandwich isn't normally a thing to write home about. It's a fall-back lunch for most delicious sandwitch",
//                     price: 300,
//                     imageURL:
//                         "https://res.cloudinary.com/dkbyh8wjz/image/upload/v1751120356/ARestro-Restaurant-Product/zymtr3stmfdqfpet8idt.jpg",
//                     sizeOptions: [
//                         { name: "small", price: 300, _id: "685ff9e5d3d8f5ab09c56fb2" },
//                         { name: "madium", price: 350, _id: "685ff9e5d3d8f5ab09c56fb3" },
//                         { name: "large", price: 400, _id: "685ff9e5d3d8f5ab09c56fb4" },
//                     ],
//                     toppings: [
//                         { name: "extra cheese", price: 50, _id: "685ff9e5d3d8f5ab09c56faf" },
//                         { name: "extra spicy", price: 20, _id: "685ff9e5d3d8f5ab09c56fb0" },
//                         { name: "extra meat", price: 30, _id: "685ff9e5d3d8f5ab09c56fb1" },
//                     ],
//                     createdAt: "2025-06-28T14:19:17.111Z",
//                     updatedAt: "2025-06-28T14:19:17.111Z",
//                 },
//             },
//         ],
//     },
// ]


const ViewSingleOrder = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const [orderData, setOrderData] = useState([])

    useEffect(() => {

        ; (async () => {
            setLoading(true)
            try {

                const singleOrder = await getSingleOrder(id)
                setOrderData(singleOrder?.data?.data)
                setLoading(false)

            } catch (error) {
                setLoading(false)
                console.log(error);
                toast.error(`${error?.response?.data?.message || error?.message}`, {
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
        })()

    }, [])

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200"
            case "confirmed":
                return "bg-blue-100 text-blue-800 border-blue-200"
            case "preparing":
                return "bg-orange-100 text-orange-800 border-orange-200"
            case "delivered":
                return "bg-green-100 text-green-800 border-green-200"
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    const formatPrice = (price) => {
        return `Rs. ${price.toLocaleString()}`
    }

    if(loading){
        return(
            <SpinnerDemo />
        )
    }

    return (
        <>
            <div className='@container/singleOrder'>
                <Button onClick={() => navigate(-1)} variant="ghost" className="text-lg"><ArrowLeft /> back to orders</Button>
                <div className="max-w-9/12 mx-auto p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Order Details</h1>
                            <p className="text-muted-foreground">Order ID: {orderData[0]?._id && orderData[0]?._id}</p>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Order Summary */}
                        <Card className="lg:col-span-2 p-5">
                            <CardHeader>
                                <CardTitle className="flex items-center text-2xl gap-2">
                                    <Package className="h-5 w-5" />

                                    Order Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">Status:</span>
                                    <Badge className={orderData[0]?.status && getStatusColor(orderData[0]?.status)}>
                                        {orderData[0]?.status && orderData[0]?.status.charAt(0).toUpperCase() + orderData[0]?.status.slice(1)}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">Payment Method:</span>
                                    <div className="flex items-center gap-2">
                                        <CreditCard className="h-4 w-4" />
                                        <span>{orderData[0]?.paymentMethod}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">Total Amount:</span>
                                    <span className="text-xl font-bold text-green-600">{orderData[0]?.totalPrice && formatPrice(orderData[0]?.totalPrice)}</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Customer Information */}
                        <Card className="p-5 flex flex-col justify-center">
                            <CardHeader>
                                <CardTitle className="flex items-center text-xl gap-2">
                                    <User className="h-5 w-5" />
                                    Customer Info
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="space-y-1">
                                    <p className="font-medium">
                                        {orderData[0]?.user?.firstname} {orderData[0]?.user?.lastname}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Mail className="h-4 w-4" />
                                    <span>{orderData[0]?.user?.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    <span>{orderData[0]?.user?.phone}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Delivery Address */}
                    <Card className="p-5">
                        <CardHeader>
                            <CardTitle className="flex text-2xl items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                Delivery Address
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-1">
                                <p className="font-medium">{orderData[0]?.address.homeAddress}</p>
                                <p className="text-muted-foreground">
                                    {orderData[0]?.address.city}, {orderData[0]?.address.country}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Products */}
                    <Card className="p-5">
                        <CardHeader>
                            <CardTitle className="text-2xl">Order Items</CardTitle>
                            <CardDescription className="mb-4">{orderData[0]?.products.length} item(s) in this order</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6 my-5">
                                {orderData[0]?.products?.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="flex-shrink-0">
                                            <img
                                                src={item?.product?.imageURL}
                                                alt={item.product.title}
                                                className="w-20 h-20 object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-xl">{item.product.title}</h3>
                                                    <p className="text-sm my-2 text-muted-foreground">{item.product.category}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">
                                                        {formatPrice(item.product.price)} × {item.quantity}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Total: {formatPrice(item.product.price * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="text-md text-muted-foreground">{item.product.description}</p>

                                            {/* Size Options */}
                                            {item.product.sizeOptions && item.product.sizeOptions.length > 0 && (
                                                <div>
                                                    <p className="text-lg font-medium mb-1">Available Sizes:</p>
                                                    <div className="flex gap-2 flex-wrap">
                                                        {item.product.sizeOptions.map((size) => (
                                                            <Badge key={size._id} variant="outline" className="text-xs">
                                                                {size.name} - {formatPrice(size.price)}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Toppings */}
                                            {item.product.toppings && item.product.toppings.length > 0 && (
                                                <div>
                                                    <p className="text-lg font-medium mb-1">Available Toppings:</p>
                                                    <div className="flex gap-2 flex-wrap">
                                                        {item.product.toppings.map((topping) => (
                                                            <Badge key={topping._id} variant="secondary" className="text-xs">
                                                                {topping.name} +{formatPrice(topping.price)}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>Added: {formatDate(item.product.createdAt)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}

                </div>
            </div>
        </>
    )
}

export default ViewSingleOrder