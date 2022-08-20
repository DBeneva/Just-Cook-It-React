import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import * as contentService from '../../../services/contentService';
import RecipeCard from '../RecipeCard/RecipeCard';
import './MyRecipes.scss';

function MyRecipes() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [myRecipes, setMyRecipes] = useState([]);

    useEffect(() => {
        contentService.loadMyRecipes()
            .then(recipes => {
                setMyRecipes(recipes);
            })
            .catch(err => {
                setError(err);
                console.error(err);
            });
    }, []);

    const buttons = (
        <div>
            <p>Add one right away!</p>
            <Link className="button" to="/new-recipe">Add New Recipe</Link>
            <button className="button cancel-btn" onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );

    const myRecipeCards = (
        <div className="recipes">
            <h2 className="title">My Recipes</h2>
            {myRecipes.map(r => <RecipeCard key={r._id} recipe={r} />)}
        </div>
    );

    const noRecipes = (
        <div className="no-recipes">
            <h2 className="title">Sorry, you have currently no recipes.</h2>
            {buttons}
        </div>
    );

    return (
        <div className="MyRecipes">
            {error && <p className="error">{error.message}</p>}

            {myRecipes && myRecipes.length > 0 && myRecipeCards}
            {myRecipes && myRecipes.length == 0 && noRecipes}
            {!myRecipes && <div className = "loader"></div>}
        </div >
    );
}

export default MyRecipes;