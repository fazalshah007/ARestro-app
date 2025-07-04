import { useState } from "react"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useDispatch, useSelector } from "react-redux"
import { decrementQuantity, incrementQuantity } from "@/store/ProductSlice/ProductSlice"
import { useNavigate } from "react-router-dom"


const Cart = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialCartItems = useSelector(state => state.productSlice.cartItem)
  const userState = useSelector(state => state.AuthSlice.user)

  const [cartItems, setCartItems] = useState(initialCartItems)



  const handleOrder = () => {

    const checkUser = userState ? (navigate("/checkout")) : (navigate("/login"))
    

  }


  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item._id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item._id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id))
  }

  const calculateItemTotal = (item) => {
    const basePrice = item.selectedSize ? item.selectedSize.price : item.price
    const toppingsPrice = item.selectedToppings.reduce((sum, topping) => sum + topping.price, 0)
    return (basePrice + toppingsPrice) * item.quantity
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + calculateItemTotal(item), 0)
  }

  const deliveryFee = 50
  const total = calculateSubtotal() + deliveryFee

 
  return (
    <>
    <div className="@container/cart">
       <div className="min-h-screen mt-0 @3xl:mt-16 bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart className="h-8 w-8" />
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600">Add some delicious items to get started!</p>
                </CardContent>
              </Card>
            ) : (
              cartItems.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <img
                          src={item.imageURL}
                          alt={item.title}
                          className="object-cover object-center size-24 rounded-lg"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <Badge variant="secondary" className="text-xs">
                              {item.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>

                        {/* Size Selection */}
                        {item.selectedSize && (
                          <div className="mb-2">
                            <span className="text-sm font-medium">Size: </span>
                            <Badge variant="outline">
                              {item.selectedSize.name} (Rs {item.selectedSize.price})
                            </Badge>
                          </div>
                        )}

                        {/* Toppings */}
                        {item.selectedToppings.length > 0 && (
                          <div className="mb-3">
                            <span className="text-sm font-medium">Toppings: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {item.selectedToppings.map((topping) => (
                                <Badge key={topping._id} variant="outline" className="text-xs">
                                  {topping.name} (Rs {topping.price})
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>{ 
                                updateQuantity(item._id, item.quantity - 1)
                                dispatch(decrementQuantity(item._id)) 
                              }}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>{
                                 updateQuantity(item._id, item.quantity + 1)
                                 dispatch(incrementQuantity(item._id))

                              }}
                              disabled={item.quantity >= 5}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">Rs {calculateItemTotal(item)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Checkout Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card className="p-5">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs {calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>Rs {deliveryFee}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>Rs{total}</span>
                </div>
              </CardContent>
            </Card>


            {/* Checkout Button */}
            <Button
            disabled={cartItems.length === 0}
            onClick={handleOrder}
              className="w-full h-12 bg-astro-green hover:bg-astro-light uppercase cursor-pointer text-lg mb-16 @3xl:mb-0"
            >
              processed checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}


export default Cart