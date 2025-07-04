import SpinnerDemo from '@/components/customized/spinner/spinner-01'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getOrders, singleOrderDelete, statusOrderUpdate } from '@/http/AllRequestFromServer'
import { Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ViewAllOrders = () => {

    const [loading, setLoading] = useState(false)
    const [trigger, setTrigger] = useState(0)

    const [defaultSelectedValue, setDefaultSelectedValue] = useState("")
    const [fetchedAllOrders, setFetchedAllOrders] = useState(null)


    useEffect(() => {

        ; (async () => {
            setLoading(true)
            try {

                const allOrders = await getOrders()
                setFetchedAllOrders(allOrders.data)

                setLoading(false)

            } catch (error) {
                console.log(error?.response);
                setLoading(false)

                toast.error(`${error?.response?.data?.message}`, {
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

    }, [trigger])


    const handleChangeStatus = async (orderId, statusValue) => {
        setLoading(true)

        try {

           const upToDateStatus = await statusOrderUpdate(orderId,{ status: statusValue })
           setDefaultSelectedValue(upToDateStatus?.data?.data?.status)
           setLoading(false)
           setTrigger((prev) => prev+1)
                       
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

        
    }

    const handleDeleteOrder = async (id) => {
        try {
            const deleteData = await singleOrderDelete(id)
            setTrigger((prev) => prev + 1)
            
        } catch (error) {
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
    }
    

    if(loading){
        return(
            <SpinnerDemo />
        )
    }

    return (
        <>
            <div className='@container/orders'>
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-6">All Users</h1>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>#Order-ID</TableHead>
                                <TableHead>Customer Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Payment Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {
                                 fetchedAllOrders?.data.length > 0 ? (
                                    fetchedAllOrders?.data?.map((order, index) => (
                            <TableRow key={order?._id + index}>
                                <TableCell>#{order?._id.slice(18)+index}</TableCell>
                                <TableCell>{order?.user?.firstname} {order?.user?.lastname}</TableCell>
                                <TableCell className="text-blue-500 font-semibold">{order?.user?.phone}</TableCell>
                                <TableCell>{order?.totalPrice}</TableCell>
                                <TableCell>({order?.paymentMethod})</TableCell>
                                <TableCell>
                                    <Select
                                        defaultValue={order?.status}
                                        onValueChange={(statusValue) => handleChangeStatus(order?._id ,statusValue)}
                                    >
                                        <SelectTrigger className="w-52 border-0 bg-blue-500 text-white font-semibold">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Update Status</SelectLabel>
                                                <SelectItem value="pending">pending</SelectItem>
                                                <SelectItem value="processing">processing</SelectItem>
                                                <SelectItem value="shipped">shipped</SelectItem>
                                                <SelectItem value="delivered">delivered</SelectItem>
                                                <SelectItem value="cancelled">cancelled</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="h-8 w-8 p-0 bg-astro-green hover:bg-astro-light">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem>
                                                <Link to={`/admin/view-order/${order?._id}`} className='flex gap-2'>
                                                    <Eye className="mr-2 h-4 w-4 hover:text-white" />
                                                    View Order
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={() => handleDeleteOrder(order?._id) }
                                                className="text-red-600 focus:bg-red-600 hover:text-white"
                                            >
                                                <Trash2 className="mr-2 h-4 w-4 hover:text-white" />
                                                Delete Order
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>

                            </TableRow>
                            ))
                                 ) : (
                                    <TableRow>
                                       <TableCell className="text-center text-4xl pt-10 font-semibold text-gray-400" colSpan={7} >
                                    Empty Orders!
                                       </TableCell>
                                    </TableRow>
                                 )
                             
                            }
                        </TableBody>
                    </Table>
                </div>

            </div>
        </>
    )
}

export default ViewAllOrders