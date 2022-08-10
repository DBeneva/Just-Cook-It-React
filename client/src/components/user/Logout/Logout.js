import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../../services/authService';
import { useAuthContext } from '../../../contexts/AuthContext';

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