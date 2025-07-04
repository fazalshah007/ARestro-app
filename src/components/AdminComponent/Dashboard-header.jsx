import { Bell, LogOut, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useDispatch, useSelector } from "react-redux"
import { loggedOutUser } from "@/http/AllRequestFromServer"
import { logOutUser } from "@/store/AuthSlice/AuthSlice"
import { deleteRefreshToken } from "@/utils/RefreshTokenSet"

const DashboardHeader = () => {

  const dispatch = useDispatch()

  const state = useSelector(state => state.AuthSlice)

   const handleLogout = async () => {
          await loggedOutUser()
          dispatch(logOutUser())
          deleteRefreshToken()
  
      }


  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold">Dashboard Overview</h1>
        </div>

        <div className="flex items-center gap-4">
        <h1 className="font-semibold mr-5">{state.user.email}</h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="default" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage />
                  <AvatarFallback className="bg-astro-green">{state?.user?.firstname.slice(0,1)}{state?.user?.lastname.slice(0,1)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{state.user.username}</p>
                  <p className="text-xs leading-none text-muted-foreground">{state.user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuItem className="group" onClick={handleLogout} ><LogOut className="group-hover:text-white" /> Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}



export default DashboardHeader;