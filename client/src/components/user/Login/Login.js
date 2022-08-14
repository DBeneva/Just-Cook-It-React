import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as authService from '../../../services/authService';
import isFormStatusValid from '../../../utils/isFormStatusValid';
import getPasswordProperty from '../../../utils/getPasswordProperty';
import getUsernameStatus from '../../../utils/getUsernameStatus';
import getPasswordStatus from '../../../utils/getPasswordStatus';

import './Login.scss';

function Login() {
    const initialState = {
        username: { value: '', status: 'untouched' },
        password: { value: '', status: 'untouched' },
        visiblePassword: false,
        submitDisabled: true
    };

    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const [error, setError] = useState(null);

    useEffect(() => {
        setState(oldState => ({
            ...oldState,
            submitDisabled: !isFormStatusValid(state)
        }));
    }, [state.username.status, state.password.status]);

    const changeUsername = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getUsernameStatus('login', currentInput);

        setState(oldState => ({
            ...oldState,
            username: { value: currentInput, status: currentStatus }
        }));
    };

    const changePassword = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getPasswordStatus('login', currentInput);

        setState(oldState => ({
            ...oldState,
            password: { value: currentInput, status: currentStatus }
        }));
    };

    const showHidePassword = (e) => {
        const stateProperty = getPasswordProperty(e);

        setState(oldState => ({
            ...oldState,
            [stateProperty]: !state[stateProperty]
        }));
    };

    const onLoginHandler = (e) => {
        e.preventDefault();

        authService.login(state.username.value, state.password.value)
            .then((authData) => {
                login(authData);
                navigate('/');
            })
            .catch(err => {
                setError(err);
                console.error(err);
            });
    };

    return (
        <div className="Login">
            <form method="post" onSubmit={onLoginHandler}>
                <h2 className="title">Login Form</h2>

                {error && <p className="error">{error.message}</p>}

                <p className="field field-icon">
                    <label htmlFor="password"><span><i className="fas fa-user"></i></span></label>
                    <input
                        className={`input-${state.username.status}`}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Johny"
                        required
                        onFocus={changeUsername}
                        onChange={changeUsername}
                    />
                </p>

                {state.username.status === 'invalid empty' && <p className="error">Username is required!</p>}
                {state.username.status === 'invalid too-short' && <p className="error">Username must be at least 3 characters long!</p>}

                <p className="field field-icon">
                    <label htmlFor="password"><span><i className="fas fa-lock"></i></span></label>
                    <input
                        className={`input-${state.password.status}`}
                        type={state.visiblePassword ? 'text' : 'password'}
                        name="password" id="password"
                        placeholder="******"
                        required
                        onFocus={changePassword}
                        onChange={changePassword}
                    />

                    <i className={state.visiblePassword ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showHidePassword}></i>

                </p>
                {state.password.status === 'invalid empty' && <p className="error">Password is required!</p>}
                {state.password.status === 'invalid too-short' && <p className="error">Password must be at least 5 characters!</p>}

                <button className="button" disabled={state.submitDisabled}>Login</button>
                <p className="register-link">
                    Don't have an account? <Link to="/register">Click here!</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;