import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../contexts/AuthContext';
import * as authService from '../../../services/authService';

import './Login.scss';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const [usernameStatus, setUsernameStatus] = useState('untouched');
    const [passwordStatus, setPasswordStatus] = useState('untouched');
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    const changeUsername = (e) => {
        const currentInput = e.target.value;

        if (currentInput.length === 0) {
            setUsernameStatus('empty');
        } else if (currentInput.length < 3) {
            setUsernameStatus('too-short');
        } else {
            setUsernameStatus('valid');
        }

        console.log(usernameStatus, passwordStatus);

        setSubmitDisabled(!(usernameStatus === 'valid' && passwordStatus === 'valid'));
    };
    

    const changePassword = (e) => {
        const currentInput = e.target.value;
        if (currentInput.length === 0) setPasswordStatus('empty');
        else if (currentInput.length < 5) setPasswordStatus('too-short');
        else setPasswordStatus('valid');

        console.log(usernameStatus, passwordStatus);

        setSubmitDisabled(!(usernameStatus === 'valid' && passwordStatus === 'valid'));
    };


    const onLoginHandler = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { email, password } = Object.fromEntries(formData);
        console.log(formData);

        authService.login(email, password)
            .then((authData) => {
                login(authData);
                console.log('logged in');
                navigate('/recipes');
            })
            .catch(err => {
                // TODO: show notification
                console.log(err);
            });
    };

    const showPassword = () => {
        setIsVisiblePassword(!isVisiblePassword);
    };

    return (
        <div className="Login">
            <form className="login" action="" method="post" onSubmit={onLoginHandler}>
                <h2 className="title">Login Form</h2>

                {/* <ng-container *ngIf="error">
            <p class="error">
                {{error}}
            </p>
        </ng-container> */}

                <p className="field field-icon">
                    <label htmlFor="password"><span><i className="fas fa-user"></i></span></label>
                    <input className={`input-${usernameStatus}`} type="text" name="username" id="username"
                        placeholder="Johny" required onFocus={changeUsername} onChange={changeUsername} onBlur={changeUsername} />
                </p>
                {
                    usernameStatus === 'empty'
                        ? <p className="error">Username is required!</p>
                        : usernameStatus === 'too-short'
                            ? <p className="error">Username must be at least 3 characters long!</p>
                            : ''
                }

                <p className="field field-icon">
                    <label htmlFor="password"><span><i className="fas fa-lock"></i></span></label>
                    <input className={`input-${passwordStatus}`} type={isVisiblePassword ? 'text' : 'password'} name="password" id="password" placeholder="******"
                        required onFocus={changePassword} onChange={changePassword} onBlur={changePassword} />

                    <i className={isVisiblePassword ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showPassword}></i>

                </p>
                {
                    passwordStatus === 'empty'
                        ? <p className="error">Password is required!</p>
                        : passwordStatus === 'too-short'
                            ? <p className="error">Password must be at least 5 characters!</p>
                            : ''
                }

                <div className="links">
                    <button className="button" disabled={submitDisabled}>Login</button>
                    <p className="register-link">
                        Don't have an account? <Link to="/register">Click here!</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;