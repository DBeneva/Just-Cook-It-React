import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as authService from '../../../services/authService';
import isFormStatusValid from '../../../utils/isFormStatusValid';
import getPasswordProperty from '../../../utils/getPasswordProperty';
import getNameStatus from '../../../utils/getNameStatus';
import getPasswordStatus from '../../../utils/getPasswordStatus';

function Login() {
    const initialState = {
        username: { value: '', status: 'untouched' },
        password: { value: '', status: 'untouched' },
        visiblePassword: false,
        submitDisabled: true
    };

    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { login } = useAuthContext();
    const [error, setError] = useState(null);
    const redirectUrl = searchParams.get('redirectUrl');

    useEffect(() => {
        setState(oldState => ({
            ...oldState,
            submitDisabled: !isFormStatusValid(state, 'login')
        }));
    }, [state.username.status, state.password.status]);

    const changeUsername = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getNameStatus(currentInput);

        setState(oldState => ({
            ...oldState,
            username: { value: currentInput, status: currentStatus }
        }));
    };

    const changePassword = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getPasswordStatus(currentInput);

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

    const loginHandler = (e) => {
        e.preventDefault();

        const userData = {
            username: state.username.value,
            password: state.password.value
        };

        authService.login(userData)
            .then((authData) => {
                login(authData);
                navigate(redirectUrl ? decodeURIComponent(redirectUrl) : '/');
            })
            .catch(err => {
                setError(err);
                console.error(err);
            });
    };

    return (
        <div className="Register-Login">
            <form method="post" onSubmit={loginHandler}>
                <h2 className="title">Login Form</h2>
                {error && <p className="error">{error.message}</p>}

                <div className="field field-icon">
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
                    {state.username.status === 'invalid empty' && <p className="error">Username is required!</p>}
                    {state.username.status === 'invalid too-short' && <p className="error">Username must be at least 3 characters long!</p>}
                </div>


                <div className="field">
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
                    {state.password.status === 'invalid empty' && <p className="error">Password is required!</p>}
                    {state.password.status === 'invalid too-short' && <p className="error">Password must be at least 5 characters!</p>}
                </div>

                <button className="button" disabled={state.submitDisabled}>Login</button>
                <div className="register-link">
                    Don't have an account? <Link to="/register">Click here!</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;