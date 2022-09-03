import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../../contexts/AuthContext';
import * as userService from '../../../../services/userService';
import getEmailStatus from '../../../../utils/getEmailStatus';
import getNameStatus from '../../../../utils/getNameStatus';
import isFormStatusValid from '../../../../utils/isFormStatusValid';
import ConfirmationModal from '../../../common/ConfirmationModal/ConfirmationModal';

function EditAccount() {
    const { login, user } = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const initialState = {
        username: { value: user.username, status: 'untouched' },
        email: { value: user.email, status: 'untouched' },
        submitDisabled: true
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        setState(oldState => ({
            ...oldState,
            submitDisabled: !isFormStatusValid(state)
        }));
    }, [state.username.status, state.email.status]);

    const changeUsername = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getNameStatus(currentInput, 'edit');

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

    const editAccount = (e) => {
        e.preventDefault();

        const data = {
            username: state.username.value,
            email: state.email.value
        };

        userService.editAccount(data, user._id)
            .then((userData) => {
                login(userData);
                navigate(`/users/${user._id}`);
            })
            .catch(err => {
                setError(err);
                console.error(err);
            });
    };

    const deleteHandler = (e) => {
        e.preventDefault();

        navigate('/logout');

        userService.deleteAccount(user._id)
            .then(() => navigate('/'))
            .finally(() => setShowDeleteModal(false));
    };

    const deleteClickHandler = (e) => {
        e.preventDefault();

        setShowDeleteModal(true);
    };

    return (
        <div className="Account">
            <ConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onSave={deleteHandler}
                toBeDeleted={'account'}
                name={user.username}
            />

            <div><img className="cooking-hat" src="/cooking-hat.png" alt="Cooking Hat" /></div>
            <h2 className="title">{user.username}'s Account</h2>

            {error && <p className="error error-centered">{error.message}</p>}

            <form className="form-account" onSubmit={editAccount}>
                <div className="field">
                    <label className="label-account" htmlFor="username"><span><i className="fas fa-user"></i></span></label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        required
                        className={`input input-${state.username.status}`}
                        defaultValue={state.username.value}
                        onChange={changeUsername}
                        minLength="3"
                    />
                    {state.username.status === 'invalid empty' && <p className="error">Username is required!</p>}
                    {state.username.status === 'invalid too-short' && <p className="error">Username must be at least 3 characters long!</p>}
                </div>

                <div className="field">
                    <label className="label-account" htmlFor="email"><span><i className="fas fa-envelope"></i></span></label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className={`input input-${state.email.status}`}
                        defaultValue={state.email.value}
                        onChange={changeEmail} />
                    {state.email.status === 'invalid empty' && <p className="error">Email is required!</p>}
                    {state.email.status === 'invalid' && <p className="error">Email is not valid!</p>}
                </div>

                <div className="field">
                    <label className="label-account"><span><i className="fas fa-lock"></i></span></label>
                    <Link className="change-password-link" to={`/users/${user._id}/change-password`}>Change your password</Link>
                </div>

                <div className="buttons">
                    <button type="button" className="naked-cancel-btn button" onClick={() => navigate(-1)}>Cancel</button>
                    <button className="naked-btn button" type="submit" disabled={state.submitDisabled}>Save</button>
                    <button type="button" className="delete-btn button" onClick={deleteClickHandler}>Delete <i className="fa fa-trash"></i></button>
                </div>
            </form>

        </div>
    );
}

export default EditAccount;