import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import * as contentService from '../../../services/contentService';
import { useAuthContext } from '../../../contexts/AuthContext';

import './MyFavorites.scss';
import RecipeCard from '../RecipeCard/RecipeCard';

function MyFavorites() {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [myFavorites, setMyFavorites] = useState({});

    useEffect(() => {
        contentService.loadMyFavorites(user)
            .then(recipes => setMyFavorites(recipes))
            .catch(err => {
                console.log(`Error: ${err}`);
            });
    }, []);

    const back = () => {
        navigate(-1);
    };

    const buttons = user.username
        ? (
            <div>
            <p>Have a look at all the recipes and like them for easy access!</p>
            <Link className="button" to="/recipes">See Recipes</Link>
            <button className="button" onClick={back}>Go Back</button>
            </div>
        )
        : <Link className="button" to="/">Go back home</Link>;

    return (
        <div className="MyFavorites">
            <div className="title">
                <h2>My Favorites</h2>
            </div>
            {/* <!-- <app-loading-recipes *ngIf="!myRecipes"></app-loading-recipes> --> */}
            {
                myFavorites && myFavorites.length > 0
                    ?
                    (
                        <div className="recipes">
                            {myFavorites.map(r => <RecipeCard key={r._id} recipe={r} />)}
                        </div>
                    )
                    : myFavorites && myFavorites.length == 0
                        ?
                        (
                            <div>
                                <h2 className="title">Sorry, you have currently no recipes.</h2>
                                {buttons}
                            </div>
                        )
                        : <div className = "loader"></div >
            }
        </div>
    )

    {/* <ng-container *ngIf="error">
            <p className="error">
                {{error}}
            </p>
        </ng-container> */}
}


export default MyFavorites;