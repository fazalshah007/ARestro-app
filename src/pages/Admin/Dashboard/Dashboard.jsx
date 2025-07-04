import React from 'react'
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from '@/components/AdminComponent/App-sidebar'
import DashboardHeader from '@/components/AdminComponent/Dashboard-header'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
            <DashboardHeader />
            <div className='m-5'>
              <Outlet />                
            </div>
        </SidebarInset>
    </SidebarProvider>
  )
}

export default Dashboard

