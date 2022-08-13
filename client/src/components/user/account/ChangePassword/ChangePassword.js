import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../../contexts/AuthContext';
import * as userService from '../../../../services/userService';

import './ChangePassword.scss';

function ChangePassword() {
    const navigate = useNavigate();
    const { login, user } = useAuthContext();
    const [error, setError] = useState(null);

    const initialState = {
        oldPassword: { value: '', status: 'untouched' },
        newPassword: { value: '', status: 'untouched' },
        confirmPassword: { value: '', status: 'untouched' },
        visibleOldPassword: false,
        visibleNewPassword: false,
        visibleConfirmPassword: false,
        submitDisabled: true
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        setState(oldState => ({
            ...oldState,
            submitDisabled: !(
                state.oldPassword.status === 'valid' &&
                state.newPassword.status === 'valid' &&
                state.confirmPassword.status === 'valid'
            )
        }));
    }, [state.oldPassword, state.newPassword, state.confirmPassword]);

    const changeOldPassword = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : currentInput.length < 5
                ? 'too-short'
                : 'valid';

        setState(oldState => ({
            ...oldState,
            oldPassword: { value: currentInput, status: currentStatus }
        }));
    };

    const changeNewPassword = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : currentInput.length < 5
                ? 'too-short'
                : /[а-яА-Я]/.test(currentInput)
                    ? 'non-latin-letters'
                    : !/[\!\?@\#\$%\^\&\*\(\)]/.test(currentInput)
                        ? 'no-special-symbol'
                        : 'valid';

        setState(oldState => ({
            ...oldState,
            newPassword: { value: currentInput, status: currentStatus },
            confirmPassword: {
                value: state.confirmPassword.value,
                status: state.confirmPassword.status === 'untouched'
                    ? 'untouched'
                    : currentInput !== state.confirmPassword.value
                        ? 'no-match'
                        : 'valid'
            }
        }));
    };

    const changeConfirmPassword = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : currentInput !== state.confirmPassword.value
                ? 'no-match'
                : 'valid';

        setState(oldState => ({
            ...oldState,
            confirmPassword: { value: currentInput, status: currentStatus }
        }));
    };

    const changePassword = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { oldPassword, newPassword } = Object.fromEntries(formData);

        userService.changePassword(oldPassword, newPassword, user)
            .then((userData) => {
                login(userData);
                console.log('password changed');
                navigate(-1);
            })
            .catch(err => {
                setError({ message: err });
                console.log(error);
            });
    };

    const showPassword = (e) => {
        const currentInput = e.target.parentElement.firstChild.getAttribute('for');
        const stateProperty = `visible${currentInput.slice(0, 1).toLocaleUpperCase()}${currentInput.slice(1)}`;

        setState(oldState => ({
            ...oldState,
            [stateProperty]: !state[stateProperty]
        }));
    };

    return (
        <div className="ChangePassword">
            <form onSubmit={changePassword} className="change-password" method="post">
                <h2 className="title">Change Password</h2>
                {error && <p className="error">{error.message}</p>}

                <div className="input-fields">

                    <p className="field field-icon">
                        <label htmlFor="oldPassword"><span>Old </span></label>
                        <input className={`input-${state.oldPassword.status}`} type={state.visibleOldPassword ? 'text' : 'password'} name="oldPassword" id="oldPassword" placeholder="******"
                            required
                            onFocus={changeOldPassword}
                            onChange={changeOldPassword}
                        />
                        <i className={state.visibleOldPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showPassword}></i>
                    </p>

                    {state.oldPassword.status === 'empty' && <p className="error">Please enter your current password!</p>}
                    {state.oldPassword.status === 'too-short' && <p className="error">Password must be at least 5 characters!</p>}

                    <p className="field field-icon">
                        <label htmlFor="newPassword"><span>New </span></label>
                        <input className={`input-${state.newPassword.status}`} type={state.visibleNewPassword ? 'text' : 'password'} name="newPassword" id="newPassword" placeholder="******"
                            required
                            onFocus={changeNewPassword}
                            onChange={changeNewPassword}
                        />
                        <i className={state.visibleNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showPassword}></i>
                    </p>

                    {state.newPassword.status === 'empty' && <p className="error">Please enter your new password!</p>}
                    {state.newPassword.status === 'too-short' && <p className="error">Password must be at least 5 characters long!</p>}
                    {state.newPassword.status === 'non-latin-letters' && <p className="error">Latin characters only!</p>}
                    {state.newPassword.status === 'no-special-symbol' && <p className="error">Please include at least one special symbol (!?@#$%^&*())!</p>}

                    <p className="field field-icon">
                        <label htmlFor="confirmPassword"><span>New </span></label>
                        <input className={`input-${state.newPassword.status}`} type={state.visibleConfirmPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" placeholder="******"
                            required
                            onFocus={changeConfirmPassword}
                            onChange={changeConfirmPassword}
                        />
                        <i className={state.visibleConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showPassword}></i>
                    </p>

                    {state.confirmPassword.status === 'empty' && <p className="error">Please confirm your new password!</p>}
                    {state.confirmPassword.status === 'no-match' && <p className="error">Passwords don't match!</p>}
                </div>

                <div className="buttons">
                    <button className="cancel-btn button" onClick={() => navigate(-1)}>Cancel</button>
                    <button className="button" type="submit" disabled={state.submitDisabled}>Save</button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;