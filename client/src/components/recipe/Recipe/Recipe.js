import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as contentService from '../../../services/contentService';
import ConfirmationModal from '../../common/ConfirmationModal/ConfirmationModal';

import './Recipe.scss';

function Recipe() {
    const navigate = useNavigate();
    const { recipeId } = useParams();

    const [error, setError] = useState(null);
    const [recipe, setRecipe] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        contentService.loadRecipe(recipeId)
            .then(recipe => {
                setRecipe(recipe);
            })
            .catch(err => {
                setError(err);
                console.error(err);
                navigate('/');
            });
    }, [recipeId]);

    const likeHandler = () => {
        contentService.likeRecipe(recipeId)
            .then((recipe) => {
                setRecipe(oldState => ({ ...oldState, likedBy: recipe.likedBy, hasLiked: true }));
            })
            .catch(err => {
                setError(err);
                console.error(err);
            });
    };

    const unlikeHandler = () => {
        contentService.unlikeRecipe(recipeId)
            .then((recipe) => {
                setRecipe(oldState => ({ ...oldState, likedBy: recipe.likedBy, hasLiked: false }));
            })
            .catch(err => {
                setError(err);
                console.error(err);
            });
    };

    const deleteHandler = (e) => {
        contentService.deleteRecipe(recipeId)
            .then(() => navigate('/recipes'))
            .finally(() => setShowDeleteModal(false))
            .catch(err => {
                setError(err);
                console.error(err);
            });
    };

    const ingredients = recipe.ingredients?.split(', ').map((i, index) => <li className="ingredients-item" key={index}>{i}</li>);
    const instructions = recipe.instructions?.split('\n').map((p, i) => <p key={i}>{p}</p>);
    const likeButton = <button className="like button" onClick={likeHandler}>Like <i className="fas fa-thumbs-up"></i></button>;
    const unlikeButton = <button className="unlike button" onClick={unlikeHandler}>Unlike <i className="fas fa-thumbs-down"></i></button>;
    const ownerButtons = (
        <div className="owner-buttons">
            <Link className="edit-btn button" to={`/recipes/${recipeId}/edit`}>Edit</Link>
            <button className="delete-btn button" onClick={() => setShowDeleteModal(true)}>Delete <i className="fa fa-trash"></i></button>
        </div>
    );

    const recipeCard = (
        <div className="card">
            <div className="card-image"><img src={recipe.imageUrl} alt="Recipe Image" /></div>
            <div className="card-header">
                <h3 className="title">{recipe.name}</h3>
                <p>
                    <i className="fas fa-clock"></i><span> {recipe.time} min</span>
                </p>
            </div>
            <div className="card-content">
                <div className="card-section">
                    <i className="fas fa-list card-content-icon"></i>
                    <ul className="ingredients-section">
                        {ingredients}
                    </ul>
                </div>
                <div className="card-section">
                    <img className="card-content-icon" src="/instructions.png" alt="Instructions" />
                    <div className="instructions">
                        {instructions}
                    </div>
                </div>
            </div>
            <div className="likes">
                <p>Liked by <span>{recipe.likedBy?.length}</span> {recipe.likedBy?.length !== 1 ? 'people' : 'person'}</p>
                {recipe.isOwner && ownerButtons}
                {recipe.isUser && !recipe.isOwner && recipe.hasLiked && unlikeButton}
                {recipe.isUser && !recipe.isOwner && !recipe.hasLiked && likeButton}
            </div>
        </div>
    );

    return (
        <div className="Recipe">
            <ConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onSave={deleteHandler}
                toBeDeleted={'recipe'}
                name={recipe.name}
            />

            <div className="back-btn">
                <i onClick={() => navigate(-1)} className="fa fa-arrow-circle-left"></i>
            </div>

            {error && <p className="error">{error.message}</p>}

            {recipe && recipeCard}
            {!recipe && <div className="loader"></div>}
        </div>
    );
}

export default Recipe;