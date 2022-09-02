import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { useAuthContext } from '../../../contexts/AuthContext';
import * as contentService from '../../../services/contentService';
import RecipeCard from '../RecipeCard/RecipeCard';
import './Recipes.scss';

function Recipes() {
    const { user } = useAuthContext();
    const [recipes, setRecipes] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        contentService.loadRecipes()
            .then(recipes => {
                setRecipes(recipes);
            })
            .catch(err => {
                setError(err);
                console.error(err);
            });
    }, []);

    const noRecipes = (
        <div className="no-recipes">
            <h2 className="title">Sorry, there are currently no recipes.</h2>
            <p>Be the first to add one!</p>
            <div>
                {user && <NavLink className="button" to="/recipes/new-recipe">Add New Recipe</NavLink>}
                <NavLink className="button cancel-btn" to="/">Go back home</NavLink>
            </div>
        </div>
    );

    return (
        <div className="Recipes">
            {error && <p className="error">{error.message}</p>}

            {recipes?.length > 0 && recipes.map(r => <RecipeCard key={r._id} recipe={r} />)}
            {recipes?.length == 0 && noRecipes}
            {/*{recipes && noRecipes}*/}
            {!recipes && <div className="loader"></div>}
        </div>
    );
}

export default Recipes;