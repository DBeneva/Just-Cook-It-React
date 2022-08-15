import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../../../contexts/AuthContext';
import './Account.scss';

function Account() {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    return (
        <div className="Account">

            <div><img className="cooking-hat" src="/cooking-hat.png" alt="Cooking Hat" /></div>
            <h2 className="title">{user.username}'s Account</h2>

            <div>
                <div className="section">
                    <p id="username"><span><i className="fas fa-user"></i></span> {user.username}</p>
                </div>

                <div className="section">
                    <p><span><i className="fas fa-envelope"></i></span> {user.email}</p>
                </div>

                <div className="section">
                    <p><span><img className="fas" src="/instructions.png" /></span> <Link to="/recipes/my-recipes">My Recipes</Link></p>
                </div>

                <div className="section">
                    <p><span><i className="fas fa-heart"></i></span> <Link to="/recipes/my-favorites">My Favourite Recipes</Link></p>
                </div>

                <div className="buttons">
                    <button className="button cancel-btn" onClick={() => navigate(-1)}>Go Back</button>
                    <Link className="button" to={`/users/${user._id}/edit`}>Edit Account</Link>
                </div>
            </div>

        </div>
    );
}

export default Account;