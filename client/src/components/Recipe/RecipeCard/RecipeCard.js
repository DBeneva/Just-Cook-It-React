import { Link } from 'react-router-dom';

import './RecipeCard.scss';

function RecipeCard({ recipe }) {
    return (
        <Link className="RecipeCard" to={`/recipes/${recipe._id}`}>
            <img className="card-image" src={recipe.imageUrl} alt="Recipe Image" />
            <div className="card-content">
                <div className="card-title">
                    <h3>{recipe.name}</h3>
                    <p>
                        <i className="fas fa-clock"></i><span> {recipe.time} min</span>
                    </p>
                </div>
                <div className="likes">
                    <p>Liked by <span>{recipe.likedBy?.length}</span> {recipe.likedBy?.length !== 1 ? 'people' : 'person'}</p>
                </div>
            </div >
        </Link>
    );
}

export default RecipeCard;