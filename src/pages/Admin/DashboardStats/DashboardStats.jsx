import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getAllUserData, getOrderStatSales } from '@/http/AllRequestFromServer'
import { BanknoteArrowUp, ShoppingCart, Users } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const DashboardStats = () => {

  const [statsOrderData, setStatsOrderData] = useState([])
  const [allUsers, setAllUsers] = useState([])


  useEffect(() => {

    ; (async () => {
      try {
        const statsData = await getOrderStatSales()
        const allUsers = await getAllUserData()
        setStatsOrderData(statsData?.data?.data)
        setAllUsers(allUsers?.data?.userData)

      } catch (error) {
        console.log(error);

      }
    })()

  }, [])

  return (
    <>
      <div>
        <div className="grid gap-4 grid-cols-3 p-5">
          <Card className="p-5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">Total Revenue</CardTitle>
              <BanknoteArrowUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Rs: {statsOrderData[0]?.totalRevenue && statsOrderData[0]?.totalRevenue}</div>
            </CardContent>
          </Card>

          <Card className="p-5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">Total Sales</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"> {statsOrderData[0]?.totalOrders && statsOrderData[0]?.totalOrders} sales</div>
            </CardContent>
          </Card>

          <Card className="p-5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"> {allUsers.length > 0 && allUsers?.length > 0 ? (allUsers?.length) : (0)} users</div>
            </CardContent>
          </Card>
        </div>


         <div className="bg-white rounded-xl p-5 shadow-md">
      <h2 className="text-xl font-bold text-[#009944] mb-4">Daily Sales & Revenue</h2>
      <ResponsiveContainer width="100%" height={550}>
        <BarChart
          data={statsOrderData}
          margin={{ top: 20, right: 40, left: 20, bottom: 5 }}
          barGap={14}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis yAxisId="left" label={{ value: "Revenue", angle: -90, position: "insideLeft" }} />
          <YAxis yAxisId="right" orientation="right" label={{ value: "Orders", angle: -90, position: "insideRight" }} />
          <Tooltip />
          <Legend />

          <Bar yAxisId="left" dataKey="totalRevenue" name="Revenue" fill="#009944" />

          <Bar yAxisId="right" dataKey="totalOrders" name="Orders" fill="#B95CF4" />
        </BarChart>
      </ResponsiveContainer>
    </div>

      </div>
    </>
  )
}

export default DashboardStats