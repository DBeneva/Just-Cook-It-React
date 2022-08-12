import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as contentService from '../../../services/contentService';
import { useAuthContext } from '../../../contexts/AuthContext';

import './Recipe.scss';
import ConfirmationModal from '../../common/ConfirmationModal/ConfirmationModal';

function Recipe() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState({});

    const like = () => {
        contentService.likeRecipe({ recipeId, user })
            .then((recipe) => {
                setRecipe(state => ({ ...state, likedBy: recipe.likedBy }));
            });
    };

    const unlike = () => {
        contentService.unlikeRecipe({ recipeId, user })
            .then((recipe) => {
                setRecipe(state => ({ ...state, likedBy: recipe.likedBy }));
            });
    };

    const deleteHandler = (e) => {
        e.preventDefault();

        contentService.deleteRecipe({ recipeId, user })
            .then(() => navigate('/recipes'))
            .finally(() => setShowDeleteModal(false));
    };

    const deleteClickHandler = (e) => {
        e.preventDefault();

        setShowDeleteModal(true);
    };

    const ingredients = recipe.ingredients?.split(', ').map((i, index) => <li className="ingredients-item" key={index}>{i}</li>);
    const instructions = recipe.instructions?.split('\n').map((p, i) => <p key={i}>{p}</p>);

    const likeButton = <button className="like button" onClick={like}>Like <i className="fas fa-thumbs-up"></i></button>;
    const unlikeButton = <button className="unlike button" onClick={unlike}>Unlike <i className="fas fa-thumbs-down"></i></button>;
    const ownerButtons = (
        <div className="owner-buttons">
            <Link className="edit-btn button" to={`/recipes/${recipeId}/edit`}>Edit</Link>
            <button className="delete-btn button" onClick={deleteClickHandler}>Delete <i className="fa fa-trash"></i></button>
        </div>
    );

    useEffect(() => {
        contentService.loadRecipe(recipeId)
            .then(recipe => {
                console.log('liked by', recipe.likedBy);
                setRecipe(recipe);
            })
            .catch(err => {
                console.error(err);
                navigate('/');
            });
    }, [recipeId]);

    return (
        <div className="Recipe">
            <ConfirmationModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onSave={deleteHandler}
                toBeDeleted={'recipe'}
                name={recipe.name}
            />
            {recipe
                ?
                <div className="card">
                    <div className="card-image"><img src={recipe.imageUrl} alt="Recipe Image" /></div>
                    <div className="card-content">
                        <div className="card-title">
                            <h3>{recipe.name}</h3>
                            <p>
                                <i className="fas fa-clock"></i><span> {recipe.time} min</span>
                            </p>
                        </div>
                        <table>
                            <tbody>
                                <tr className="card-section">
                                    <td>
                                        <h4><i className="fas fa-list"></i></h4>
                                    </td>
                                    <td>
                                        <ul className="ingredients-section">
                                            {ingredients}
                                        </ul>
                                    </td>
                                </tr>
                                <tr className="card-section">
                                    <td>
                                        <h4><img src="/instructions.png" alt="Instructions" /></h4>
                                    </td>
                                    <td>
                                        <div className="instructions">
                                            {instructions}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="likes">
                            <div>
                                <p>Liked by <span>{recipe.likedBy?.length}</span> {recipe.likedBy?.length !== 1 ? 'people' : 'person'}</p>
                            </div>
                            {
                                user.username
                                    ? recipe.owner === user._id
                                        ? ownerButtons
                                        : recipe.likedBy?.toString().includes(user._id)
                                            ? unlikeButton
                                            : likeButton
                                    : ''
                            }
                        </div>
                    </div>
                </div>
                : <div className="loader"></div>}
        </div>
    );
}


export default Recipe;