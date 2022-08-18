import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as authService from '../../../services/authService';
import isFormStatusValid from '../../../utils/isFormStatusValid';
import getPasswordStatus from '../../../utils/getPasswordStatus';
import getUsernameStatus from '../../../utils/getUsernameStatus';
import getPasswordProperty from '../../../utils/getPasswordProperty';
import getEmailStatus from '../../../utils/getEmailStatus';
import getRepassStatus from '../../../utils/getRepassStatus';

import '../Auth.scss';

function Register() {
    const initialState = {
        username: { value: '', status: 'untouched' },
        email: { value: '', status: 'untouched' },
        password: { value: '', status: 'untouched' },
        repass: { value: '', status: 'untouched' },
        visiblePassword: false,
        visibleRepass: false,
        submitDisabled: false
    };

    const [state, setState] = useState(initialState);
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const [error, setError] = useState(null);

    useEffect(() => {
        setState(oldState => ({
            ...oldState,
            submitDisabled: !isFormStatusValid(state, 'register')
        }));
    }, [state.username.status, state.email.status, state.password.status, state.repass.status]);

    const changeUsername = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getUsernameStatus(currentInput, 'register');

        setState(oldState => ({
            ...oldState,
            username: { value: currentInput, status: currentStatus }
        }));
    };

    const changeEmail = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getEmailStatus(currentInput);

        setState(oldState => ({
            ...oldState,
            email: { value: currentInput, status: currentStatus }
        }));
    };

    const changePassword = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getPasswordStatus(currentInput, 'register');

        setState(oldState => ({
            ...oldState,
            password: { value: currentInput, status: currentStatus },
            repass: {
                value: state.repass.value,
                status: state.repass.status === 'untouched' ? 'untouched' : getRepassStatus(state.repass.value, currentInput)
            }
        }));
    };

    const changeRepass = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getRepassStatus(currentInput, state.password.value);

        setState(oldState => ({
            ...oldState,
            repass: { value: currentInput, status: currentStatus }
        }));
    };

    const showHidePassword = (e) => {
        const stateProperty = getPasswordProperty(e);

        setState(oldState => ({
            ...oldState,
            [stateProperty]: !state[stateProperty]
        }));
    };

    const registerHandler = (e) => {
        e.preventDefault();

        const userData = {
            username: state.username.value,
            email: state.email.value,
            password: state.password.value
        };

        authService.register(userData)
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
        <div className="Register-Login">
            <form className="register" method="post" onSubmit={registerHandler}>
                <h2 className="title">Registration Form</h2>
                {error && <p className="error">{error.message}</p>}

                <div className="field field-icon">
                    <label htmlFor="username"><span><i className="fas fa-user"></i></span></label>
                    <input className={`input-${state.username.status}`}
                        type="text" name="username" id="username"
                        placeholder="Johny"
                        required
                        onFocus={changeUsername}
                        onChange={changeUsername}
                    />
                    {state.username.status === 'invalid empty' && <p className="error">Username is required!</p>}
                    {state.username.status === 'invalid non-alphanumeric' && <p className="error">Latin characters only!</p>}
                    {state.username.status === 'invalid too-short' && <p className="error">Username must be at least 3 characters long!</p>}
                </div>

                <div className="field field-icon">
                    <label htmlFor="email"><span><i className="fas fa-envelope"></i></span></label>
                    <input className={`input-${state.email.status}`} type="email" name="email" id="email"
                        placeholder="john.doe@gmail.com"
                        onFocus={changeEmail}
                        onChange={changeEmail}
                    />
                    {state.email.status === 'invalid empty' && <p className="error">Email is required!</p>}
                    {state.email.status === 'invalid' && <p className="error">Email is not valid!</p>}
                </div>

                <div className="field field-icon">
                    <label htmlFor="password"><span><i className="fas fa-lock"></i></span></label>
                    <input className={`input-${state.password.status}`} type={state.visiblePassword ? 'text' : 'password'} name="password"
                        id="password" placeholder="******"
                        onFocus={changePassword}
                        onChange={changePassword}
                    />
                    <i className={state.visiblePassword ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showHidePassword}></i>
                    {state.password.status === 'invalid empty' && <p className="error">Password is required!</p>}
                    {state.password.status === 'invalid too-short' && <p className="error">Password must be at least 5 characters!</p>}
                    {state.password.status === 'invalid non-latin-letters' && <p className="error">Latin characters only!</p>}
                    {state.password.status === 'invalid no-special-symbol' && <p className="error">Please include at least one special symbol: <span className="special-symbol">!?@#$%^&*()</span>!</p>}
                </div>

                <div className="field field-icon">
                    <label htmlFor="repass"><span><i className="fas fa-lock"></i></span></label>
                    <input className={`input-${state.repass.status}`} type={state.visibleRepass ? 'text' : 'password'} name="repass" id="repass" placeholder="******"
                        onFocus={changeRepass}
                        onChange={changeRepass}
                    />
                    <i className={state.visibleRepass ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showHidePassword}></i>
                    {state.repass.status === 'invalid empty' && <p className="error">Please confirm password!</p>}
                    {state.repass.status === 'invalid no-match' && <p className="error">Passwords don't match!</p>}
                </div>

                <button className="button" disabled={state.submitDisabled}>Create Account</button>
                <div className="login-link">
                    Have an account? <Link to="/login">Click here!</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;