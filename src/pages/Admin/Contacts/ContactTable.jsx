import SpinnerDemo from '@/components/customized/spinner/spinner-01'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteMessage, getAllMessages } from '@/http/AllRequestFromServer'
import { reRenderComponent } from '@/store/ProductSlice/ProductSlice'
import { Edit, MoreHorizontal, Trash2, View } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ContactTable = () => {

    const rerender = useSelector(state => state.productSlice.updateComponent)

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);
    const [fetchedAllMessages, setFetchedAllMessages] = useState([]);



    useEffect(() => {

        ; (async () => {
            setLoading(true)
            try {
                const allMessages = await getAllMessages()
                setFetchedAllMessages(allMessages.data.contacts)
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        })()

    }, [rerender])

    const handleDeleteMessage = async (id) => {
        try {

            const deletedMessge =  await deleteMessage(id)
            dispatch(reRenderComponent())

            
        } catch (error) {
            console.log(error);
            
        }
    }

    if (loading) {
        return (
            <SpinnerDemo />
        )
    }

    

    return (
        <div>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-6">All Contact Messages</h1>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            fetchedAllMessages && fetchedAllMessages?.map((message, index) => (
                                <TableRow key={message?._id}>
                                    <TableCell>{message?.fullname}</TableCell>
                                    <TableCell>{message?.email}</TableCell>
                                    <TableCell>{message?.subject}</TableCell>
                                    <TableCell>{new Date(message?.createdAt).toLocaleString()}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>
                                                    <Link className='flex gap-2' to={`/admin/view-message/${message?._id}`}>
                                                        <View className="mr-2 h-4 w-4 hover:text-white" />
                                                        View Message
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    onClick={() => handleDeleteMessage(message?._id)}
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
        </div>
    )
}

export default ContactTable