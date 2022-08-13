import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

import * as contentService from '../../../services/contentService';
import { useAuthContext } from '../../../contexts/AuthContext';

import './EditRecipe.scss';

function EditRecipe() {
    const { recipeId } = useParams();
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

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

    const [state, setState] = useState(initialState);

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
                    },
                    submitDisabled: true
                }));

                console.log('recipe in state', state);
            })
            .catch(error => {
                console.error(error);

                setError(error);
                navigate(`/recipes/${recipeId}`);
            });
    }, [recipeId]);


    useEffect(() => {
        setState(oldState => ({
            ...oldState,
            submitDisabled: !(
                state.recipeData.name.status === 'valid' || 'untouched' &&
                state.recipeData.time.status === 'valid' || 'untouched' &&
                state.recipeData.ingredients.status === 'valid' || 'untouched' &&
                state.recipeData.instructions.status === 'valid' || 'untouched' &&
                state.recipeData.imageUrl.status === 'valid' || 'untouched'
            )
        }));
    }, [state.recipeData.name.value, state.recipeData.time.value, state.recipeData.ingredients.value, state.recipeData.instructions.value, state.recipeData.imageUrl.value]);


    const changeRecipeName = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : currentInput.length < 3
                ? 'too-short'
                : 'valid';

        setState(oldState => ({
            ...oldState,
            recipeData: { ...oldState.recipeData, name: { value: currentInput, status: currentStatus } }
        }));
    };

    const changeTime = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : 'valid';

        setState(oldState => ({
            ...oldState,
            recipeData: { ...oldState.recipeData, time: { value: currentInput, status: currentStatus } }
        }));
    };

    const changeIngredients = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : 'valid';

        setState(oldState => ({
            ...oldState,
            recipeData: { ...oldState.recipeData, ingredients: { value: currentInput, status: currentStatus } }
        }));
    };

    const changeInstructions = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : 'valid';

        setState(oldState => ({
            ...oldState,
            recipeData: { ...oldState.recipeData, instructions: { value: currentInput, status: currentStatus } }
        }));
    };

    const changeImageUrl = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : !/^https?:\/\/.+/.test(currentInput)
                ? 'invalid'
                : 'valid';

        setState(oldState => ({
            ...oldState,
            recipeData: { ...oldState.recipeData, imageUrl: { value: currentInput, status: currentStatus } }
        }));
    };

    const editRecipe = (e) => {
        e.preventDefault();

        const recipeData = Object.entries(state.recipeData).reduce((acc, [k, v]) => Object.assign(acc, { [k]: v.value }), { _id: recipeId });
        
        contentService.updateRecipe({ ...recipeData, user })
            .then(() => {
                navigate('/recipes');
            })
            .catch((error) => {
                setError(error);
                setState(oldState => ({ ...oldState, submitDisabled: true }));
            });
    };

    return (
        <div className="EditRecipe">
            <div className="page-title">
                <h2 className="title">Edit Recipe</h2>
            </div>

            {error && <p className="error">{error.message}</p>}

            <form onSubmit={editRecipe}>
                <div className="title-section">
                    <div className="recipe-title">
                        <label htmlFor="recipeName">Title <span className="red">*</span></label>
                        <input type="text" name="recipeName" id="recipeName" required minLength="3"
                            defaultValue={state.recipeData.name.value}
                            onInput={changeRecipeName} />
                        {state.recipeData.name.status === 'empty' && <p className="error">Recipe name is required!</p>}
                        {state.recipeData.name.status === 'too-short' && <p className="error">Recipe name must be at least 3 characters long!</p>}
                    </div>
                    <div>
                        <label htmlFor="time">Cooking Time (Minutes) <span className="red">*</span></label>
                        <input type="number" name="time" id="time" required min="0"
                            defaultValue={state.recipeData.time.value}
                            onInput={changeTime} />
                        {state.recipeData.time.status === 'empty' && <p className="error">Recipe time is required!</p>}
                    </div>
                </div>
                <div className="ingredients">
                    <label htmlFor="ingredients">Ingredients (Comma-Separated) <span className="red">*</span></label>
                    <textarea type="text" name="ingredients" id="ingredients" rows="3" required
                        placeholder="Ingredient 1, Ingredient 2, Ingredient 3"
                        defaultValue={state.recipeData.ingredients.value}
                        onInput={changeIngredients}>
                    </textarea>
                    {state.recipeData.ingredients.status === 'empty' && <p className="error">Please enter ingredients for your recipe!</p>}
                </div>
                <div className="instructions">
                    <label htmlFor="instructions">Instructions <span className="red">*</span></label>
                    <textarea type="text" name="instructions" id="instructions" rows="3" required
                        defaultValue={state.recipeData.instructions.value}
                        onInput={changeInstructions}>
                    </textarea>
                    {state.recipeData.instructions.status === 'empty' && <p className="error">Please enter instructions for your recipe!</p>}
                </div>
                <div className="image">
                    <label htmlFor="imageUrl">Image URL <span className="red">*</span></label>
                    <input type="text" name="imageUrl" id="imageUrl" required placeholder="http(s)://"
                        defaultValue={state.recipeData.imageUrl.value}
                        onInput={changeImageUrl} />
                    {state.recipeData.imageUrl.status === 'empty' && <p className="error">Recipe image is required!</p>}
                    {state.recipeData.imageUrl.status === 'invalid' && <p className="error">Please enter a valid URL!</p>}
                </div>
                <div className="buttons">
                    <Link to={`/recipes/${recipeId}`} className="cancel button">Cancel</Link>
                    <button type="submit" className="submit button" disabled={state.submitDisabled}>Save Recipe</button>
                </div>
            </form >
        </div >
    );
}


export default EditRecipe;