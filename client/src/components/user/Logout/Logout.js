import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as authService from '../../../services/authService';

const Logout = () => {
    const { logout, user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        authService.logout(user.token)
            .then(() => {
                logout();
                navigate('/');
            });
    }, []);

    return null;
};

export default Logout;