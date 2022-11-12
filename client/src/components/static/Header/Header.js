import { Link, NavLink } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext';
import './Header.scss';

function Header() {
    const { user } = useAuthContext();

    const guestNavigation = (
        <div>
            <li className="navigation-list-item"><NavLink className={({ isActive }) => "button" + (isActive ? " active-btn" : "")} to="/recipes">Recipes</NavLink></li>
            <li className="navigation-list-item"><NavLink className={({ isActive }) => "button" + (isActive ? " active-btn" : "")} to="/login">Login</NavLink></li>
            <li className="navigation-list-item"><NavLink className={({ isActive }) => "button" + (isActive ? " active-btn" : "")} to="/register">Register</NavLink></li>
        </div>
    );

    const userNavigation = (
        <div className="user">
            <li className="navigation-list-item"><NavLink className={(({ isActive }) => "button" + (isActive ? " active-btn" : ""))} to="/recipes">Recipes</NavLink></li >
            <li className="navigation-list-item"><NavLink className={(({ isActive }) => "button" + (isActive ? " active-btn" : ""))} to="/new-recipe">New Recipe</NavLink></li>
            <li className="navigation-list-item"><NavLink className={({ isActive }) => "button" + (isActive ? " active-btn" : "")} to="/my-recipes">My Recipes</NavLink></li>
            <li className="navigation-list-item"><NavLink className={({ isActive }) => "button" + (isActive ? " active-btn" : "")} to="/my-favorites">My Favorites</NavLink></li>
            <li className="navigation-list-item account-button">
                <NavLink className={({ isActive }) => "button" + (isActive ? " active-btn" : "")} to={`/users/${user._id}`}><i className="fas fa-user"></i> {user.username}</NavLink>
                <div className="dropdown">
                    <div className="navigation-list-item"><NavLink className={({ isActive }) => "button" + (isActive ? " active-btn" : "")} to={`/users/${user._id}`}>Account</NavLink></div >
                    <div className="navigation-list-item"><NavLink className="button logout" to="/logout">Logout</NavLink></div >
                </div>
            </li>
        </div >
    );

    const userNavigationMobile = (
        <div className="user">
            <li className="navigation-list-item"><NavLink className={(({ isActive }) => "button" + (isActive ? " active-btn" : ""))} to="/recipes">Recipes</NavLink></li >
            <li className="navigation-list-item"><NavLink className={(({ isActive }) => "button" + (isActive ? " active-btn" : ""))} to="/new-recipe">New Recipe</NavLink></li>
            <li className="navigation-list-item"><NavLink className={({ isActive }) => "button" + (isActive ? " active-btn" : "")} to="/my-recipes">My Recipes</NavLink></li>
            <li className="navigation-list-item"><NavLink className={({ isActive }) => "button" + (isActive ? " active-btn" : "")} to="/my-favorites">My Favorites</NavLink></li>
            <li className="navigation-list-item"><NavLink className={({ isActive }) => "button" + (isActive ? " active-btn" : "")} to={`/users/${user._id}`}><i className="fas fa-user"></i> {user.username}</NavLink></li>
            <li className="navigation-list-item"><NavLink className="button logout" to="/logout">Logout</NavLink></li>
        </div >
    );

    return (
        <div className="Header">
            <div>
                <Link className="logo title" to="/">Just c<img className="logo-egg" src="/fried-egg.png" alt="Egg" /><img className="logo-egg" src="/fried-egg.png" alt="Egg" />k it!</Link>
            </div>

            <nav className="navigation">
                <div className="menu">
                    <i className="fas fa-bars"></i>
                    <div className="dropdown">
                        {user.username ? userNavigationMobile : guestNavigation}
                    </div>
                </div>
                <ul>
                    {user.username ? userNavigation : guestNavigation}
                </ul >
            </nav >

        </div >
    );
}

export default Header;