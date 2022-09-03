import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import * as contentService from '../../../services/contentService';
import getNameStatus from '../../../utils/getNameStatus';
import getRequiredInputStatus from '../../../utils/getRequiredInputStatus';
import getUrlStatus from '../../../utils/getUrlStatus';
import isFormStatusValid from '../../../utils/isFormStatusValid';

function EditRecipe() {
    const initialState = {
        recipeData: {
            name: { value: '', status: 'untouched' },
            time: { value: '', status: 'untouched' },
            ingredients: { value: '', status: 'untouched' },
            instructions: { value: '', status: 'untouched' },
            imageUrl: { value: '', status: 'untouched' }
        },
        submitDisabled: true
    };

    const navigate = useNavigate();
    const { recipeId } = useParams();
    const [state, setState] = useState(initialState);
    const [error, setError] = useState(null);

    useEffect(() => {
        contentService.loadRecipe(recipeId)
            .then(recipe => {
                setState(oldState => ({
                    ...oldState,
                    recipeData: {
                        name: { value: recipe.name, status: 'untouched' },
                        time: { value: recipe.time, status: 'untouched' },
                        ingredients: { value: recipe.ingredients, status: 'untouched' },
                        instructions: { value: recipe.instructions, status: 'untouched' },
                        imageUrl: { value: recipe.imageUrl, status: 'untouched' }
                    }
                }));

                console.log('recipe in state', state);
            })
            .catch(err => {
                setError(err);
                console.error(err);
                navigate(`/recipes/${recipeId}`);
            });
    }, [recipeId]);


    useEffect(() => {
        setState(oldState => ({
            ...oldState,
            submitDisabled: !isFormStatusValid(state.recipeData)
        }));
    }, [state.recipeData.name, state.recipeData.time, state.recipeData.ingredients, state.recipeData.instructions, state.recipeData.imageUrl]);


    const changeRecipeName = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getNameStatus(currentInput);

        setState(oldState => ({
            ...oldState,
            recipeData: { ...oldState.recipeData, name: { value: currentInput, status: currentStatus } }
        }));
    };

    const changeTime = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getRequiredInputStatus(currentInput);

        setState(oldState => ({
            ...oldState,
            recipeData: { ...oldState.recipeData, time: { value: currentInput, status: currentStatus } }
        }));
    };

    const changeIngredients = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getRequiredInputStatus(currentInput);

        setState(oldState => ({
            ...oldState,
            recipeData: { ...oldState.recipeData, ingredients: { value: currentInput, status: currentStatus } }
        }));
    };

    const changeInstructions = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getRequiredInputStatus(currentInput);

        setState(oldState => ({
            ...oldState,
            recipeData: { ...oldState.recipeData, instructions: { value: currentInput, status: currentStatus } }
        }));
    };

    const changeImageUrl = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getUrlStatus(currentInput);

        setState(oldState => ({
            ...oldState,
            recipeData: { ...oldState.recipeData, imageUrl: { value: currentInput, status: currentStatus } }
        }));
    };

    const editRecipe = (e) => {
        e.preventDefault();

        const recipeData = Object.entries(state.recipeData).reduce((acc, [k, v]) => Object.assign(acc, { [k]: v.value }), { _id: recipeId });

        contentService.updateRecipe(recipeData)
            .then(() => {
                navigate('/recipes');
            })
            .catch((err) => {
                setError(err);
                console.error(err);
                setState(oldState => ({ ...oldState, submitDisabled: true }));
            });
    };

    return (
        <div className="recipe-form">
            <div className="page-title">
                <h2 className="title">Edit Recipe</h2>
            </div>

            {error && <p className="error">{error.message}</p>}

            <form className="form-recipe" onSubmit={editRecipe}>
                <div className="title-time">
                    <div className="recipe-title">
                        <label htmlFor="recipeName" className="label-recipe">Title <span className="error">*</span></label>
                        <input
                            className={`input input-${state.recipeData.name.status}`}
                            type="text"
                            name="recipeName"
                            id="recipeName"
                            required
                            defaultValue={state.recipeData.name.value}
                            onFocus={changeRecipeName}
                            onChange={changeRecipeName}
                            onBlur={changeRecipeName}
                        />
                        {state.recipeData.name.status === 'invalid empty' && <p className="error">Recipe name is required!</p>}
                        {state.recipeData.name.status === 'invalid too-short' && <p className="error">Recipe name must be at least 3 characters long!</p>}
                    </div>

                    <div>
                        <label htmlFor="time" className="label-recipe">Cooking Time (Minutes) <span className="error">*</span></label>
                        <input
                            className={`input input-${state.recipeData.time.status}`}
                            type="number"
                            name="time"
                            id="time"
                            required
                            min="0"
                            defaultValue={state.recipeData.time.value}
                            onFocus={changeTime}
                            onChange={changeTime}
                            onBlur={changeTime}
                        />
                        {state.recipeData.time.status === 'invalid empty' && <p className="error">Recipe time is required!</p>}
                    </div>
                </div>

                <div className="ingredients">
                    <label htmlFor="ingredients" className="label-recipe">Ingredients (Comma-Separated) <span className="error">*</span></label>
                    <textarea
                        className={`input input-${state.recipeData.ingredients.status}`}
                        type="text"
                        name="ingredients"
                        id="ingredients"
                        rows="3"
                        required
                        placeholder="Ingredient 1, Ingredient 2, Ingredient 3"
                        defaultValue={state.recipeData.ingredients.value}
                        onFocus={changeIngredients}
                        onChange={changeIngredients}
                        onBlur={changeIngredients}
                    >
                    </textarea>
                    {state.recipeData.ingredients.status === 'invalid empty' && <p className="error">Please enter ingredients for your recipe!</p>}
                </div>

                <div className="instructions">
                    <label htmlFor="instructions" className="label-recipe">Instructions <span className="error">*</span></label>
                    <textarea
                        className={`input input-${state.recipeData.instructions.status}`}
                        type="text"
                        name="instructions"
                        id="instructions"
                        rows="3"
                        required
                        defaultValue={state.recipeData.instructions.value}
                        onFocus={changeInstructions}
                        onChange={changeInstructions}
                        onBlur={changeInstructions}
                    >
                    </textarea>
                    {state.recipeData.instructions.status === 'invalid empty' && <p className="error">Please enter instructions for your recipe!</p>}
                </div>

                <div className="image">
                    <label htmlFor="imageUrl" className="label-recipe">Image URL <span className="error">*</span></label>
                    <input
                        className={`input input-${state.recipeData.imageUrl.status}`}
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        required
                        placeholder="http(s)://"
                        defaultValue={state.recipeData.imageUrl.value}
                        onFocus={changeImageUrl}
                        onChange={changeImageUrl}
                        onBlur={changeImageUrl}
                    />
                    {state.recipeData.imageUrl.status === 'invalid empty' && <p className="error">Recipe image is required!</p>}
                    {state.recipeData.imageUrl.status === 'invalid' && <p className="error">Please enter a valid URL!</p>}
                </div>

                <div className="buttons">
                    <Link to={`/recipes/${recipeId}`} className="cancel-btn button">Cancel</Link>
                    <button type="submit" className="submit button" disabled={state.submitDisabled}>Save Recipe</button>
                </div>
            </form >
        </div >
    );
}


export default EditRecipe;