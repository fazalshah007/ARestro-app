import SpinnerDemo from '@/components/customized/spinner/spinner-01'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getAllUserData } from '@/http/AllRequestFromServer'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const AllUsers = () => {

  const [allUsersData, setAllUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    ; (async () => {
      setLoading(true)
      try {

        const allUsers = await getAllUserData()
        setAllUsersData(allUsers.data?.userData)
        setLoading(false)


      } catch (error) {
        console.log(error);
        setLoading(false)
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

  if(loading){
    return(
      <SpinnerDemo />
    )
  }


  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">All Users</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#ID</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {allUsersData?.map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>#{user._id}</TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell><Badge variant="destructive">{user.role}</Badge></TableCell>
                <TableCell>{user.email}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default AllUsers