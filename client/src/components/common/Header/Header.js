import { Link, NavLink } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext';
import './Header.scss';

function Header() {
    const { user } = useAuthContext();

    const guestNavigation = (
        <div>
            <li className="navigation-list-item"><NavLink className="button" to="/recipes">Recipes</NavLink></li>
            <li className="navigation-list-item"><NavLink className="button" to="/login">Login</NavLink></li>
            <li className="navigation-list-item"><NavLink className="button" to="/register">Register</NavLink></li>
        </div>
    );

    const userNavigation = (
        <div className="user">
            <li className="navigation-list-item"><NavLink className="button" to="/recipes">Recipes</NavLink></li >
            <li className="navigation-list-item"><NavLink className="button" to="/recipes/new-recipe">New Recipe</NavLink></li>
            <li className="navigation-list-item"><NavLink className="button" to="/recipes/my-recipes">My Recipes</NavLink></li>
            <li className="navigation-list-item"><NavLink className="button" to="/recipes/my-favorites">My Favorites</NavLink></li>
            <li className="navigation-list-item"><NavLink className="button" to="/users"><i className="fas fa-user"></i> {user.username}</NavLink></li >
            <li className="navigation-list-item"><NavLink className="button logout" to="/logout">Logout</NavLink></li >
        </div >
    );
    return (
        <div className="Header">
            <div>
                <Link className="logo title" to="/">Just c<img className="logo-egg" src="/fried-egg.png" alt="Egg" /><img className="logo-egg" src="/fried-egg.png" alt="Egg" />k it!</Link>
            </div>

            <nav className="navigation">
                <ul>
                    {
                    user.username
                    ? userNavigation
                    : guestNavigation
                    }
                </ul >
            </nav >

        </div >
    );
}

export default Header;