import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../../contexts/AuthContext';

import './Account.scss';

function Account() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [error, setError] = useState(null);

    // const initialState = {
    //     username: { value: '', status: 'untouched' },
    //     password: { value: '', status: 'untouched' },
    //     isVisiblePassword: false,
    //     submitDisabled: false
    // };

    // const [state, setState] = useState(initialState);

    // useEffect(() => {
    //     setState(oldState => ({
    //         ...oldState,
    //         submitDisabled: !(state.username.status === 'valid' && state.password.status === 'valid')
    //     }));
    // }, [state.username.status, state.password.status]);

    // const changeUsername = (e) => {
    //     const currentInput = e.target.value;
    //     const currentStatus = currentInput.length == 0
    //         ? 'empty'
    //         : currentInput.length < 3
    //             ? 'too-short'
    //             : 'valid';

    //     setState(oldState => ({
    //         ...oldState,
    //         username: { value: currentInput, status: currentStatus }
    //     }));
    // };

    // const changePassword = (e) => {
    //     const currentInput = e.target.value;
    //     const currentStatus = currentInput.length == 0
    //         ? 'empty'
    //         : currentInput.length < 5
    //             ? 'too-short'
    //             : 'valid';

    //     setState(oldState => ({
    //         ...oldState,
    //         password: { value: currentInput, status: currentStatus }
    //     }));
    // };

    // const showPassword = () => {
    //     setState(oldState => ({
    //         ...oldState,
    //         isVisiblePassword: !state.isVisiblePassword
    //     }));
    // };

    // const onAccountHandler = (e) => {
    //     e.preventDefault();

    //     const formData = new FormData(e.currentTarget);
    //     const { username, password } = Object.fromEntries(formData);

    //     authService.login(username, password)
    //         .then((authData) => {
    //             login(authData);
    //             console.log('logged in');
    //             navigate(-1);
    //         })
    //         .catch(err => {
    //             setError(err);
    //         });
    // };

    return (
        <div className="Account">
    <h2 className="title">
        <p className="image"><img src="/cooking-hat.png" alt="Cooking Hat" /></p>
        {user.username}'s Account
    </h2>

    {/* <ng-container *ngIf="error">
        <p className="error">
            {{error}}
        </p>
    </ng-container> */}

    <div className="field field-icon">
        <p id="username"><span><i className="fas fa-user"></i></span> {user.username}</p>
    </div>

    <div className="field field-icon">
        <p><span><i className="fas fa-envelope"></i></span> {user.email}</p>
    </div>

    <div className="field field-icon">
        <p><span><img src="/instructions.png" /></span> <Link to="/recipes/my-recipes">My Recipes</Link></p>
    </div>

    <div className="field field-icon">
        <p><span><i className="fas fa-heart"></i></span> <Link to="/recipes/my-favorites">My Favourite Recipes</Link></p>
    </div>

    <div className="buttons">
        <button className="button" onClick={() => navigate(-1)}>Go Back</button>
        <Link className="button" to={`/users/${user._id}/edit`}>Edit Account</Link>
    </div>
</div>
    );
}

export default Account;