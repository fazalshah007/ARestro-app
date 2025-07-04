import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthLayouts = ({ children, state, allowedRoles }) => {

   if(state.accessToken && allowedRoles.includes(state?.user?.role)){
    return <Navigate to="/admin/dashboard" replace />
  }
  
  if(state?.user?.role == "customer"){
    return <Navigate to="/" replace />
  }
 
  return (
    <div  className="@container/login flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md @md/login:max-w-xl ">
            { children }
        </div>
    </div>
  )
}

export default AuthLayouts