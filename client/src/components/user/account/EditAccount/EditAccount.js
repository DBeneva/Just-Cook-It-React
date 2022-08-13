import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../../contexts/AuthContext';
import * as userService from '../../../../services/userService';

import ConfirmationModal from '../../../common/ConfirmationModal/ConfirmationModal';
import './EditAccount.scss';

function EditAccount() {
    const navigate = useNavigate();
    const { login, user } = useAuthContext();
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
            submitDisabled: !(
                (state.username.status === 'valid' && state.email.status === 'valid') ||
                (state.username.status === 'untouched' && state.email.status === 'valid') ||
                (state.username.status === 'valid' && state.email.status === 'untouched')
            )
        }));
    }, [state.username.status, state.email.status]);

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

    const changeEmail = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : !/[a-z]+\@[a-z]+\.[a-z]+/.test(currentInput)
                ? 'invalid'
                : 'valid';

        setState(oldState => ({
            ...oldState,
            email: { value: currentInput, status: currentStatus }
        }));
    };

    const editAccount = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const { username, email } = Object.fromEntries(formData);

        userService.editAccount(username, email, user)
            .then((userData) => {
                login(userData);
                console.log('account edited');
                navigate(-1);
            })
            .catch(err => {
                setError({ message: err });
                console.log(error);
            });
    };

    const deleteHandler = (e) => {
        e.preventDefault();

        navigate('/logout');

        userService.deleteAccount(user)
            .then(() => navigate('/'))
            .finally(() => setShowDeleteModal(false));
    };

    const deleteClickHandler = (e) => {
        e.preventDefault();

        setShowDeleteModal(true);
    };

    return (
        <div className="EditAccount">
            <ConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onSave={deleteHandler}
                toBeDeleted={'account'}
                name={user.username}
            />

            <h2 className="title">
                <p><img src="/cooking-hat.png" alt="Cooking Hat" /></p>
                {user.username}'s Account
            </h2>
            {error && <p className="error">{error.message}</p>}

            <form onSubmit={editAccount}>
                <div className="field field-icon">
                    <label htmlFor="username"><span><i className="fas fa-user"></i></span></label>
                    <input type="text" name="username" id="username" required
                        className={`input-${state.username.status}`}
                        defaultValue={state.username.value}
                        onFocus={changeUsername}
                        onChange={changeUsername}
                        minLength="3" />
                </div>

                {state.username.status === 'empty' && <p className="error">Username is required!</p>}
                {state.username.status === 'too-short' && <p className="error">Username must be at least 3 characters long!</p>}

                <div className="field field-icon">
                    <label htmlFor="email"><span><i className="fas fa-envelope"></i></span></label>
                    <input type="email" name="email" id="email" required
                        className={`input-${state.email.status}`}
                        defaultValue={state.email.value}
                        onFocus={changeEmail}
                        onChange={changeEmail} />
                </div>

                {state.email.status === 'empty' && <p className="error">Email is required!</p>}
                {state.email.status === 'invalid' && <p className="error">Email is not valid!</p>}

                <div className="change-password">
                    <p>
                        <span><i className="fas fa-lock"></i></span>
                        <Link to={`/users/${user._id}/change-password`}>Change your password</Link>
                    </p>
                </div>

                <div className="buttons">
                    <button className="cancel-btn button" onClick={() => navigate(-1)}>Cancel</button>
                    <button className="button" type="submit" disabled={state.submitDisabled}>Save</button>
                    <button type="button" className="delete-btn button" onClick={deleteClickHandler}>Delete <i className="fa fa-trash"></i></button>
                </div>
            </form>

        </div>
    );
}

export default EditAccount;