import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useSearchParams } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

const GuardedRoute = () => {
    const { isAuthenticated } = useAuthContext();
    
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default GuardedRoute;