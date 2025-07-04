import logo from "@/assets/images/logo.png";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose,
    SheetFooter,
} from "@/components/ui/sheet"


import React from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../button";
import { useDispatch, useSelector } from "react-redux";
import { loggedOutUser } from "@/http/AllRequestFromServer";
import { logOutUser } from "@/store/AuthSlice/AuthSlice";
import { deleteRefreshToken } from "@/utils/RefreshTokenSet";

const Navbar = () => {

    const dispatch = useDispatch()

    const state = useSelector(state => state.AuthSlice)
    const stateProduct = useSelector(state => state.productSlice)


    const navigate = useNavigate()

    const handleLogout = async () => {
        await loggedOutUser()
        dispatch(logOutUser())
        deleteRefreshToken()

    }


    const bottomBarLinks = [
        {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="currentColor"><path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" /></svg>',
            iconName: "Home",
            pathName: "/"
        },
        {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="currentColor"><path d="m691-150 139-138-42-42-97 95-39-39-42 43 81 81ZM240-600h480v-80H240v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40ZM120-80v-680q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v267q-19-9-39-15t-41-9v-243H200v562h243q5 31 15.5 59T486-86l-6 6-60-60-60 60-60-60-60 60-60-60-60 60Zm120-200h203q3-21 9-41t15-39H240v80Zm0-160h284q38-37 88.5-58.5T720-520H240v80Zm-40 242v-562 562Z"/></svg>',
            iconName: "Orders",
            pathName: "/orders"
        },
        {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="currentColor"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM208-800h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Z"/></svg>',
            iconName: "Cart",
            pathName: "/cart"
        },
        {
            icon: '<svg xmlns="http://www.w3.org/2000/svg" height="100%" viewBox="0 -960 960 960" width="100%" fill="currentColor"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>',
            iconName: "Profile",
            pathName: "/account"
        },
    ]

    const categories = stateProduct?.category
    



    return (
        <div className="@container/header">
            <div className="fixed w-full bg-white text-black z-50">
                <div className="@2xl:w-11/12 mx-auto my-2 hidden @3xl:flex justify-between items-center z-10">

                    <Link to="/">
                        <div className="w-14 object-cover object-center flex items-center justify-items-start gap-3 cursor-pointer">
                            <img className="w-full h-full" src={logo} alt="ARestro-logo-image" />
                            <h1 className="text-xl font-semibold hidden @4xl:flex">ARestro</h1>
                        </div>
                    </Link>
                    <div>
                        <NavigationMenu>
                            <NavigationMenuList>

                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild active={false} className="text-lg @4xl:text-xl font-semibold">
                                        <Link to="/">Home</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem className="bg-tansparent">
                                    <NavigationMenuTrigger className="text-lg @4xl:text-xl font-semibold">Categories</NavigationMenuTrigger>
                                    <NavigationMenuContent className="bg-transparent shadow-none px-5 py-3 w-7">
                                        {
                                            categories?.map((category, index) => (
                                                 <Link to={`/products?category=${category}&page=${1}`} key={index} className=" flex flex-col px-7 py-2 min-w-52 hover:bg-astro-light hover:text-white capitalize">{category}
                                                 </Link>
                                            ))
                                        }
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className="text-lg @4xl:text-xl font-semibold">
                                        <Link to="/products">Products</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className="text-lg @4xl:text-xl font-semibold">
                                        <Link>Contact</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div className="flex items-center justify-between">
                        <Sheet>
                            <SheetTrigger className="mr-5 hover:cursor-pointer text-white bg-astro-green p-3 rounded-full relative">
                                <span className="absolute -top-1 -left-1 bg-red-600 w-6 h-6 flex items-center justify-center rounded-full">{stateProduct.cartItem.length}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM208-800h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Z" /></svg>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Your Cart</SheetTitle>
                                    <SheetDescription>
                                        See all orders to your cart
                                    </SheetDescription>
                                </SheetHeader>
                                {/* main cart section start  */}
                                <div>
                                    {
                                        stateProduct?.cartItem && stateProduct?.cartItem.length != 0 ? (
                                            <div>
                                                {
                                                    stateProduct.cartItem.map((item, index) => (
                                                        <div key={index} className="flex items-center p-2 mt-3 bg-black/5">
                                                    <div className="size-16">
                                                        <img className="w-full h-full object-cover object-center" src={item.imageURL} alt="product-image" />
                                                    </div>
                                                    <div className="ml-3 w-full">
                                                        <h1 className="text-xl font-semibold">{item.title}</h1>
                                                        <h1 className="flex justify-between"><span>Price </span><span className="font-semibold">{item.price}/=</span></h1>
                                                    </div>
                                                </div>
                                                    ))
                                                }
                                                
                                            </div>
                                        ) : (
                                             <div className="w-full flex justify-center">
                                                <h1 className="text-2xl text-slate-700/40">Your Cart is Empty :{`(`}</h1>
                                            </div>
                                        )
                                    }
                                </div>
                                {/* main cart section end */}
                                <SheetFooter>
                                    <Button className="flex justify-center items-center text-lg font-bold bg-astro-green hover:bg-astro-light" onClick={() => navigate("/cart")} >Your Cart</Button>
                                    <SheetClose asChild className="flex justify-center items-center">
                                        <Button variant="secondary" className="flex justify-center items-center text-lg font-bold border-1 border-black/20" >Close</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        {
                            state?.user?.role ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="text-white bg-astro-green rounded-full p-3 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" /></svg>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel className="font-bold">{state.user?.firstname} {state.user?.lastname}</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={() => navigate("/account")}>Profile</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => navigate("/orders")}>Orders</DropdownMenuItem>
                                        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Link className="bg-astro-green text-white px-4 py-2 rounded-full hover:bg-astro-light" to="/login">Login</Link>
                            )
                        }
                    </div>
                </div>
            </div>
            {/* bottom navigation can support mobile or tab devices  */}
            <div className="fixed z-50 w-full bg-white bottom-0 @3xl:hidden p-2">
                <div className="flex justify-around">
                    {
                        bottomBarLinks.map((item, index) => (
                            <NavLink to={item.pathName} key={index} className={({ isActive }) => (
                                isActive ? "text-astro-green flex justify-center items-center flex-col" : "text-gray-500 flex justify-center items-center flex-col")}>
                                <span className="w-6 @md:w-8" dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                                <span>{item.iconName}</span>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar;

