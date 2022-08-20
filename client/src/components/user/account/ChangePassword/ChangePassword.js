import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../../contexts/AuthContext';
import * as userService from '../../../../services/userService';
import getPasswordProperty from '../../../../utils/getPasswordProperty';
import getPasswordStatus from '../../../../utils/getPasswordStatus';
import getRepassStatus from '../../../../utils/getRepassStatus';
import isFormStatusValid from '../../../../utils/isFormStatusValid';

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
            submitDisabled: !isFormStatusValid(state, 'change-password')
        }));
    }, [state.oldPassword.status, state.newPassword.status, state.confirmPassword.status]);

    const changeOldPassword = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getPasswordStatus(currentInput);

        setState(oldState => ({
            ...oldState,
            oldPassword: { value: currentInput, status: currentStatus }
        }));
    };

    const changeNewPassword = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getPasswordStatus(currentInput, 'change-password');

        setState(oldState => ({
            ...oldState,
            newPassword: { value: currentInput, status: currentStatus },
            confirmPassword: {
                value: state.confirmPassword.value,
                status: state.confirmPassword.status === 'untouched' ? 'untouched' : getRepassStatus(state.confirmPassword.value, currentInput)
            }
        }));
    };

    const changeConfirmPassword = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getRepassStatus(currentInput, state.newPassword.value);

        setState(oldState => ({
            ...oldState,
            confirmPassword: { value: currentInput, status: currentStatus }
        }));
    };

    const changePassword = (e) => {
        e.preventDefault();

        const data = {
            oldPassword: state.oldPassword.value,
            newPassword: state.newPassword.value
        };

        userService.changePassword(data, user._id)
            .then((userData) => {
                login(userData);
                navigate(`/users/${user._id}`);
            })
            .catch(err => {
                setError(err);
                console.error(err);
            });
    };

    const showHidePassword = (e) => {
        const stateProperty = getPasswordProperty(e);

        setState(oldState => ({
            ...oldState,
            [stateProperty]: !state[stateProperty]
        }));
    };

    return (
        <div className="Account">
            <form onSubmit={changePassword} method="post">
                <h2 className="title">Change Password</h2>
                {error && <p className="error">{error.message}</p>}

                <div className="field">
                    <label className="label-text" htmlFor="oldPassword"><span>Old </span></label>
                    <input className={`input-${state.oldPassword.status} password`} type={state.visibleOldPassword ? 'text' : 'password'} name="oldPassword" id="oldPassword" placeholder="******"
                        required
                        onFocus={changeOldPassword}
                        onChange={changeOldPassword}
                    />
                    <i className={state.visibleOldPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showHidePassword}></i>
                    {state.oldPassword.status === 'invalid empty' && <p className="error">Please enter your current password!</p>}
                    {state.oldPassword.status === 'invalid too-short' && <p className="error">Password must be at least 5 characters!</p>}
                </div>


                <div className="field">
                    <label className="label-text" htmlFor="newPassword"><span>New </span></label>
                    <input className={`input-${state.newPassword.status} password`} type={state.visibleNewPassword ? 'text' : 'password'} name="newPassword" id="newPassword" placeholder="******"
                        required
                        onFocus={changeNewPassword}
                        onChange={changeNewPassword}
                    />
                    <i className={state.visibleNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showHidePassword}></i>
                    {state.newPassword.status === 'invalid empty' && <p className="error">Please enter your new password!</p>}
                    {state.newPassword.status === 'invalid too-short' && <p className="error">Password must be at least 5 characters long!</p>}
                    {state.newPassword.status === 'invalid non-latin-letters' && <p className="error">Latin characters only!</p>}
                    {state.newPassword.status === 'invalid no-special-symbol' && <p className="error">Please include at least one special symbol: !?@#$%^&*()!</p>}
                </div>

                <div className="field">
                    <label className="label-text" htmlFor="confirmPassword"><span>New </span></label>
                    <input className={`input-${state.confirmPassword.status} password`} type={state.visibleConfirmPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" placeholder="******"
                        required
                        onFocus={changeConfirmPassword}
                        onChange={changeConfirmPassword}
                    />
                    <i className={state.visibleConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'} onClick={showHidePassword}></i>
                    {state.confirmPassword.status === 'invalid empty' && <p className="error">Please confirm your new password!</p>}
                    {state.confirmPassword.status === 'invalid no-match' && <p className="error">Passwords don't match!</p>}
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