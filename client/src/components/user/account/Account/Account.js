import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../../contexts/AuthContext';

import './Account.scss';

function Account() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [error, setError] = useState(null);

    return (
        <div className="Account">
    <div className="card-header">
        <div className="image"><img src="/cooking-hat.png" alt="Cooking Hat" /></div>
        <h2 className="title">{user.username}'s Account</h2>
    </div>

    {error && <p className="error">{error.message}</p>}

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