import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({state, allowedRoles }) => {
  if (!state.accessToken) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.includes(state?.user?.role)) {
      return <Outlet />;
    
  }
  return <Navigate to="/" replace />;
  
};

export default ProtectedRoute;
