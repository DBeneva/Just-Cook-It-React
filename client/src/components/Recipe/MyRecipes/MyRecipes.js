import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import * as contentService from '../../../services/contentService';
import { useAuthContext } from '../../../contexts/AuthContext';

import './MyRecipes.scss';
import RecipeCard from '../RecipeCard/RecipeCard';

function MyRecipes() {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [myRecipes, setMyRecipes] = useState({});

    useEffect(() => {
        contentService.loadMyRecipes(user)
            .then(recipes => setMyRecipes(recipes))
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
                <p>Add one right away!</p>
                <Link className="button" to="/recipes/new-recipe">Add New Recipe</Link>
                <Link className="button" onClick={back}>Go Back</Link>
            </div>
        )
        : <Link className="button" to="/">Go back home</Link>;

    return (
        <div className="MyRecipes">
            <div className="title">
                <h2>My Recipes</h2>
            </div>
            {/* <!-- <app-loading-recipes *ngIf="!myRecipes"></app-loading-recipes> --> */}
            {
                myRecipes && myRecipes.length > 0
                    ?
                    (
                        <div className="recipes">
                            {myRecipes.map(r => <RecipeCard key={r._id} recipe={r} />)}
                        </div>
                    )
                    : myRecipes && myRecipes.length == 0
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


export default MyRecipes;