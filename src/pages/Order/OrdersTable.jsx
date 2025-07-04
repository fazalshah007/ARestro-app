import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const OrdersTable = ({ orders }) => {
  return (
    <>
      <div className="hidden @3xl:block">
        {/* ---------------------------------------------------------------------------------------------- */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6">All Orders</h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Products</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow key={order._id}>
                  <TableCell>#{order._id.slice(0, 4) + index + 1}</TableCell>
                  <TableCell>{order.user.firstname} {order.user.lastname}</TableCell>
                  <TableCell><Badge variant={order.status === "cancelled" ? "destructive" : order.status === "pending" ? "default"  : "secondary"}>{order.status}</Badge></TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>Rs: {order.totalPrice}</TableCell>
                  <TableCell>
                    {order.address.homeAddress}, {order.address.city}, {order.address.country}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">View</Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xl" aria-describedby={undefined}>
                        <DialogHeader>
                          <DialogTitle>Products in Order #{index + 1}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {order.products.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 border rounded p-2">
                              <img
                                src={item.product.imageURL}
                                alt={item.product.title}
                                className="size-24 rounded object-cover"
                              />
                              <div>
                                <p className="font-semibold text-xl">{item.product.title}</p>
                                <Badge variant="secondary"><p className="text-sm text-gray-500">{item.product.category}</p></Badge>
                                <p className="text-md">Qty: {item.quantity}</p>
                                <p className="text-md">Rs: {item.product.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {/* --------------------------------MOBILE VERSION------------------------------------------------------------ */}
      </div>
      <div className="block @3xl:hidden w-11/12 mx-auto">
        <div className="my-5">
          <h1 className="text-3xl font-bold">All Orders</h1>
          <div className="grid grid-cols-1 gap-4 mt-4 mb-24">
            {/* ----------------------------------------------------------------------------------------------------------- */}
            {
              orders?.map((order, index) => (
                <div key={order._id} className="w-full p-3 bg-gray-100 hover:bg-gray-200/80 rounded-md">
                  <h1 className="text-xl font-bold">{order.user.firstname} {order.user.lastname}</h1>
                  <h1 className="text-gray-500 text-sm my-1">{order.address.homeAddress}, {order.address.city}, {order.address.country}</h1>
                  <h1 className="text-end mx-3"><Badge variant={order.status === "cancelled" ? "destructive" : order.status === "pending" ? "default"  : "secondary"} className="text-sm">{order.status}</Badge></h1>
                  <h1 className="text-xl font-semibold text-gray-700/90">Rs: {order.totalPrice}</h1>
                  <div className="flex justify-between">
                    <h1 className="text-sm my-2">{order.paymentMethod}</h1>
                    <div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">View</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xl" aria-describedby={undefined}>
                          <DialogHeader>
                            <DialogTitle>Products in Order #{index + 1}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            {order.products.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-4 border rounded p-2">
                                <img
                                  src={item.product.imageURL}
                                  alt={item.product.title}
                                  className="size-24 rounded object-cover"
                                />
                                <div>
                                  <p className="font-semibold text-xl">{item.product.title}</p>
                                  <Badge variant="secondary"><p className="text-sm text-gray-500">{item.product.category}</p></Badge>
                                  <p className="text-md">Qty: {item.quantity}</p>
                                  <p className="text-md">Rs: {item.product.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                </div>
              ))
            }


            {/* ----------------------------------------------------------------------------------------------------------- */}

          </div>
        </div>
      </div>
    </>
  )
}

export default OrdersTable;
