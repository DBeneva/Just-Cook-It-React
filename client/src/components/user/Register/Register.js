import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import * as authService from '../../../services/authService';

import './Register.scss';

function Register() {
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const initialState = {
        username: { value: '', status: 'untouched' },
        email: { value: '', status: 'untouched' },
        password: { value: '', status: 'untouched' },
        repass: { value: '', status: 'untouched' },
        isVisiblePassword: false,
        isVisibleRepass: false,
        submitDisabled: false
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        setState(oldState => ({
            ...oldState,
            submitDisabled: !(
                state.username.status === 'valid' &&
                state.email.status === 'valid' &&
                state.password.status === 'valid' &&
                state.repass.status === 'valid'
            )
        }));
    }, [
        state.username.status,
        state.email.status,
        state.password.status,
        state.repass.status
    ]);

    const changeUsername = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'invalid empty'
            : /[^a-zA-Z]/.test(currentInput)
                ? 'invalid non-alphanumeric'
                : currentInput.length < 3
                    ? 'invalid too-short'
                    : 'valid';

        setState(oldState => ({
            ...oldState,
            username: { value: currentInput, status: currentStatus }
        }));
    };

    const changeEmail = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'invalid empty'
            : !/^[a-z]+\@[a-z]+\.[a-z]+$/.test(currentInput)
                ? 'invalid'
                : 'valid';

        setState(oldState => ({
            ...oldState,
            email: { value: currentInput, status: currentStatus }
        }));
    };

    const changePassword = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'invalid empty'
            : currentInput.length < 5
                ? 'invalid too-short'
                : /[а-яА-Я]/.test(currentInput)
                    ? 'invalid non-latin-letters'
                    : !/[\!\?@\#\$%\^\&\*\(\)]/.test(currentInput)
                        ? 'invalid no-special-symbol'
                        : 'valid';

        setState(oldState => ({
            ...oldState,
            password: { value: currentInput, status: currentStatus },
            repass: {
                value: state.repass.value,
                status: state.repass.status === 'untouched'
                    ? 'untouched'
                    : currentInput !== state.repass.value
                        ? 'invalid no-match'
                        : 'valid'
            }
        }));
    };

    const changeRepass = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'invalid empty'
            : currentInput !== state.password.value
                ? 'invalid no-match'
                : 'valid';

        setState(oldState => ({
            ...oldState,
            repass: { value: currentInput, status: currentStatus }
        }));
    };

    const showPassword = () => {
        setState(oldState => ({
            ...oldState,
            isVisiblePassword: !state.isVisiblePassword
        }));
    };

    const showRepass = () => {
        setState(oldState => ({
            ...oldState,
            isVisibleRepass: !state.isVisibleRepass
        }));
    };

    const onRegisterHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { username, email, password } = Object.fromEntries(formData);
        console.log(formData);

        authService.register(username, email, password)
            .then((authData) => {
                login(authData);
                console.log('registered');
                navigate('/recipes');
            })
            .catch(err => {
                setError(err);
            });
    };

    return (
        <div className="Register">
            <form className="register" method="post" onSubmit={onRegisterHandler}>
                <h2 className="title">Registration Form</h2>

                {error && <p className="error">{error.message}</p>}

                <p className="field field-icon">
                    <label htmlFor="username"><span><i className="fas fa-user"></i></span></label>
                    <input className={`input-${state.username.status}`}
                        type="text" name="username" id="username"
                        placeholder="Johny"
                        required
                        onFocus={changeUsername}
                        onChange={changeUsername}
                    />
                </p>
                {state.username.status === 'invalid empty' && <p className="error">Username is required!</p>}
                {state.username.status === 'invalid non-alphanumeric' && <p className="error">Latin characters only!</p>}
                {state.username.status === 'invalid too-short' && <p className="error">Username must be at least 3 characters long!</p>}

                <p className="field field-icon">
                    <label htmlFor="email"><span><i className="fas fa-envelope"></i></span></label>
                    <input className={`input-${state.email.status}`} type="email" name="email" id="email"
                        placeholder="john.doe@gmail.com"
                        onFocus={changeEmail}
                        onChange={changeEmail}
                    />
                </p>
                {state.email.status === 'invalid empty' && <p className="error">Email is required!</p>}
                {state.email.status === 'invalid' && <p className="error">Email is not valid!</p>}

                <p className="field field-icon">
                    <label htmlFor="password"><span><i className="fas fa-lock"></i></span></label>
                    <input className={`input-${state.password.status}`} type={state.isVisiblePassword ? 'text' : 'password'} name="password"
                        id="password" placeholder="******"
                        onFocus={changePassword}
                        onChange={changePassword}
                    />
                    <i className={state.isVisiblePassword ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showPassword}></i>
                </p>

                {state.password.status === 'invalid empty' && <p className="error">Password is required!</p>}
                {state.password.status === 'invalid too-short' && <p className="error">Password must be at least 5 characters!</p>}
                {state.password.status === 'invalid non-latin-letters' && <p className="error">Latin characters only!</p>}
                {state.password.status === 'invalid no-special-symbol' && <p className="error">Please include at least one special symbol: <span className="special-symbol">!?@#$%^&*()</span>!</p>}

                <p className="field field-icon">
                    <label htmlFor="repass"><span><i className="fas fa-lock"></i></span></label>
                    <input className={`input-${state.repass.status}`} type={state.isVisibleRepass ? 'text' : 'password'} name="repass" id="repass" placeholder="******"
                        onFocus={changeRepass}
                        onChange={changeRepass}
                    />
                    <i className={state.isVisibleRepass ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showRepass}></i>
                </p>

                {state.repass.status === 'invalid empty' && <p className="error">Please confirm password!</p>}
                {state.repass.status === 'invalid no-match' && <p className="error">Passwords don't match!</p>}

                <div className="links">
                    <button className="button" disabled={state.submitDisabled}>Create Account</button>
                    <p className="login-link">
                        Have an account? <Link to="/login">Click here!</Link>
                    </p>
                </div>

            </form>
        </div>
    );
}

export default Register;