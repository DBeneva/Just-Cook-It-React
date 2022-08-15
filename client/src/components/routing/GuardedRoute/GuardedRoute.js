import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';

const GuardedRoute = () => {
    const { isAuthenticated } = useAuthContext();
    const redirectUrl = useLocation().pathname;

    return isAuthenticated ? <Outlet /> : <Navigate to={`/login?redirectUrl=${encodeURIComponent(`${redirectUrl}`)}`} />;
};

export default GuardedRoute;