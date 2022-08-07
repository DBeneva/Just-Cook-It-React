import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as contentService from '../../../services/contentService';
import { useAuthContext } from '../../../contexts/AuthContext';

import './Recipe.scss';

function Recipe() {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    // const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const { recipeId } = useParams();
    console.log('recipe id', recipeId);
    console.log('user', user);
    const [recipe, setRecipe] = useState({});
    const ingredients = recipe.ingredients?.split(', ').map((i, index) => <li className="ingredients-item" key={index}>{i}</li>);
    const instructions = recipe.instructions?.split('\n').map((p, i) => <p key={i}>{p}</p>);
    const likeButton = <button className="like">Like <i className="fas fa-thumbs-up"></i></button>;
    const unlikeButton = <button className="unlike">Unlike <i className="fas fa-thumbs-down"></i></button>;
    const ownerButtons = (
        <div className="owner-buttons">
            <Link className="edit-btn button" to={`/recipes/${recipeId}/edit`}>Edit</Link>
            <button className="delete-btn button">Delete <i className="fa fa-trash"></i></button>
        </div>
    );

    /* <button *ngIf="recipe.isUser && !recipe.isOwner && !recipe.hasLiked" className="like" (click)="likeRecipe(recipe._id)"> */
    /* Like <i className="fas fa-thumbs-up"></i></button> */
    /* <button *ngIf="recipe.isUser && !recipe.isOwner && recipe.hasLiked" className="unlike" (click)="unlikeRecipe(recipe._id)"> */
    /* Unlike <i className="fas fa-thumbs-down"></i></button> */
    /* <div className="owner-buttons" *ngIf="recipe.isOwner"> */
    /* <button className="edit-btn" routerLink="/recipes/{{recipe._id}}/edit">Edit</button> */
    /* <button className="delete-btn" (click)="showDeleteModal(true)">Delete <i className="fa fa-trash"></i></button> */

    useEffect(() => {
        contentService.loadRecipe(recipeId)
            .then(recipe => {
                console.log('recipe', recipe);
                setRecipe(recipe);
            })
            .catch(err => {
                console.error(err);
                navigate('/');
            });
    }, [recipeId]);

    // useEffect(() => {
    //     likeService.getPetLikes(petId)
    //         .then((likes) => {
    //             setPet(state => ({ ...state, likes }));
    //         });
    // }, []);

    return (
        <div className="Recipe">
            {/* <app-delete-recipe [recipeName]="recipe.name" [recipeId]="recipe._id" (hideModal)="showDeleteModal(false)" *ngIf="isDeletingRecipe"></app-delete-recipe> */}
            {/* <div className="back-btn"><i (click)="back()" className="fa fa-arrow-circle-left"></i></div> */}
            {/* <ng-container *ngIf="error">
        <p className="error">
            {{error}}
        </p>
    </ng-container> */}
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
                               user
                               ? ownerButtons
                               : likeButton
                            }
                        </div>
                    </div>
                </div>
                : <div className="loader"></div>}
        </div>
    );
}


export default Recipe;