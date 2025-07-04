import React, { useState } from 'react'
import { MoreHorizontal, Plus, Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { deleteProduct } from '@/http/AllRequestFromServer'
import { reRenderComponent } from '@/store/ProductSlice/ProductSlice'
import SpinnerDemo from '@/components/customized/spinner/spinner-01'



const DashboardProductTable = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const stateProduct = useSelector((state => state?.productSlice?.products))

    const [loading, setLoading] = useState(false)

    const handleDeleteProduct = async (id) => {
        setLoading(true)
        try {

            await deleteProduct(id)
            setLoading(false)
            dispatch(reRenderComponent())


        } catch (error) {
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
    }

    if (loading) {
        return (
            <SpinnerDemo />
        )
    }

    return (
        <>
            <Card className="p-5">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="text-4xl">Products Management</CardTitle>
                            <CardDescription>Manage your product inventory and track stock levels</CardDescription>
                        </div>
                        <Button onClick={() => navigate("/admin/create-product")} className="bg-astro-green hover:bg-astro-light">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Product
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border mt-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[200px]">Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Created</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    stateProduct && stateProduct?.map((item, index) => (
                                        <TableRow key={item._id + index}>
                                            <TableCell className="font-medium">{item.title}</TableCell>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell>{item.price}</TableCell>
                                            <TableCell><div className="size-9"><img className='w-full object-cover object-center' src={item.imageURL} alt="product image" /></div></TableCell>
                                            <TableCell className="text-muted-foreground">{new Date(item.createdAt).toLocaleString()}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" className="h-8 w-8 p-0">
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuItem>
                                                            <Link className='flex gap-2' to={`/admin/edit-product/${item?._id}`}>
                                                                <Edit className="mr-2 h-4 w-4 hover:text-white" />
                                                                Edit Product
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem
                                                            onClick={() => handleDeleteProduct(item?._id)}
                                                            className="text-red-600 focus:bg-red-600 hover:text-white"
                                                        >
                                                            <Trash2 className="mr-2 h-4 w-4 hover:text-white" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

        </>
    )
}

export default DashboardProductTable