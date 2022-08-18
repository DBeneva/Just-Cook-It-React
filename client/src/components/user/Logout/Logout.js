import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as authService from '../../../services/authService';

const Logout = () => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        authService.logout()
            .then(() => {
                logout();
                navigate('/');
            });
    }, []);

    return null;
};

export default Logout;