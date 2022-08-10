import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import * as authService from '../../../services/authService';

import './Login.scss';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const [error, setError] = useState(null);

    const initialState = {
        username: { value: '', status: 'untouched' },
        password: { value: '', status: 'untouched' },
        isVisiblePassword: false,
        submitDisabled: false
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        setState(oldState => ({
            ...oldState,
            submitDisabled: !(state.username.status === 'valid' && state.password.status === 'valid')
        }));
    }, [state.username.status, state.password.status]);

    const changeUsername = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : currentInput.length < 3
                ? 'too-short'
                : 'valid';

        setState(oldState => ({
            ...oldState,
            username: { value: currentInput, status: currentStatus }
        }));
    };

    const changePassword = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : currentInput.length < 5
                ? 'too-short'
                : 'valid';

        setState(oldState => ({
            ...oldState,
            password: { value: currentInput, status: currentStatus }
        }));
    };

    const showPassword = () => {
        setState(oldState => ({
            ...oldState,
            isVisiblePassword: !state.isVisiblePassword
        }));
    };

    const onLoginHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { username, password } = Object.fromEntries(formData);

        authService.login(username, password)
            .then((authData) => {
                login(authData);
                console.log('logged in');
                navigate('/recipes');
            })
            .catch(err => {
                setError(err);
            });
    };

    return (
        <div className="Login">
            <form className="login" action="" method="post" onSubmit={onLoginHandler}>
                <h2 className="title">Login Form</h2>

                {error && <p className="error">{error.message}</p>}

                <p className="field field-icon">
                    <label htmlFor="password"><span><i className="fas fa-user"></i></span></label>
                    <input className={`input-${state.username.status}`} type="text" name="username" id="username"
                        placeholder="Johny" required
                        onInput={changeUsername}
                        />
                </p>

                {state.username.status === 'empty' && <p className="error">Username is required!</p>}
                {state.username.status === 'too-short' && <p className="error">Username must be at least 3 characters long!</p>}

                <p className="field field-icon">
                    <label htmlFor="password"><span><i className="fas fa-lock"></i></span></label>
                    <input className={`input-${state.password.status}`} type={state.isVisiblePassword ? 'text' : 'password'} name="password" id="password" placeholder="******"
                        required
                        onChange={changePassword}
                    />

                    <i className={state.isVisiblePassword ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showPassword}></i>

                </p>
                {state.password.status === 'empty' && <p className="error">Password is required!</p>}
                {state.password.status === 'too-short' && <p className="error">Password must be at least 5 characters!</p>}

                <div className="links">
                    <button className="button" disabled={state.submitDisabled}>Login</button>
                    <p className="register-link">
                        Don't have an account? <Link to="/register">Click here!</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;