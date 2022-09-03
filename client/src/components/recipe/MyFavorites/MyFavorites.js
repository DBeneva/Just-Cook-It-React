import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import * as contentService from '../../../services/contentService';
import RecipeCard from '../RecipeCard/RecipeCard';

function MyFavorites() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [myFavorites, setMyFavorites] = useState(null);

    useEffect(() => {
        contentService.loadMyFavorites()
            .then(recipes => setMyFavorites(recipes))
            .catch(err => {
                setError(err);
                console.error(err);
            });
    }, []);

    const buttons = (
        <>
            <p className="my-recipes-message">Have a look at the recipes and like the best ones!</p>
            <div>
                <Link className="button" to="/recipes">See Recipes</Link>
                <button className="button cancel-btn" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        </>
    );

    const myFavoriteRecipeCards = (
        <>
            <h2 className="title">My Favorites</h2>
            <div className="recipes">
                {myFavorites?.length > 0 && myFavorites.map(r => <RecipeCard key={r._id} recipe={r} />)}
            </div>
        </>
    );

    const noRecipes = (
        <div className="no-recipes">
            <h2 className="title">Sorry, you haven't liked any recipes yet.</h2>
            {buttons}
        </div>
    );

    return (
        <div className="my-recipes">
            {error && <p className="error">{error.message}</p>}

            {myFavorites && myFavorites.length > 0 && myFavoriteRecipeCards}
            {myFavorites?.length === 0 && noRecipes}
            {!myFavorites && <div className="loader"></div>}
        </div>
    );
}

export default MyFavorites;