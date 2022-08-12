import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import * as contentService from '../../../services/contentService';
import { useAuthContext } from '../../../contexts/AuthContext';

import './NewRecipe.scss';

function NewRecipe() {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const initialState = {
        recipeName: { value: '', status: 'untouched' },
        time: { value: '', status: 'untouched' },
        ingredients: { value: '', status: 'untouched' },
        instructions: { value: '', status: 'untouched' },
        imageUrl: { value: '', status: 'untouched' },
        submitDisabled: false
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        setState(oldState => ({
            ...oldState,
            submitDisabled: !(
                state.recipeName.status === 'valid' &&
                state.time.status === 'valid' &&
                state.ingredients.status === 'valid' &&
                state.instructions.status === 'valid' &&
                state.imageUrl.status === 'valid'
            )
        }));
    }, [state.recipeName.status, state.time.status, state.ingredients.status, state.instructions.status, state.imageUrl.status]);


    const changeRecipeName = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : currentInput.length < 3
                ? 'too-short'
                : 'valid';

        setState(oldState => ({
            ...oldState,
            recipeName: { value: currentInput, status: currentStatus }
        }));
    };

    const changeTime = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : 'valid';

        setState(oldState => ({
            ...oldState,
            time: { value: currentInput, status: currentStatus }
        }));
    };

    const changeIngredients = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : 'valid';

        setState(oldState => ({
            ...oldState,
            ingredients: { value: currentInput, status: currentStatus }
        }));
    };

    const changeInstructions = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : 'valid';

        setState(oldState => ({
            ...oldState,
            instructions: { value: currentInput, status: currentStatus }
        }));
    };

    const changeImageUrl = (e) => {
        const currentInput = e.target.value;
        const currentStatus = currentInput.length == 0
            ? 'empty'
            : !/^https?:\/\/.+/.test(currentInput)
                ? 'invalid'
                : 'valid';

        console.log(currentInput, currentStatus);

        setState(oldState => ({
            ...oldState,
            imageUrl: { value: currentInput, status: currentStatus }
        }));
    };

    const createRecipe = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const recipeData = Object.fromEntries(formData);

        contentService.saveRecipe(recipeData, user)
            .then(() => {
                navigate('/recipes');
            })
            .catch(err => {
                setError(err);
            });
    };

    return (
        <div className="NewRecipe">
            <div className="page-title">
                <h2 className="title">New Recipe</h2>
            </div>

            {error && <p className="error">{error.message}</p>}

            <form onSubmit={createRecipe}>
                <div className="title-section">
                    <div className="recipe-title">
                        <label htmlFor="recipeName">Title <span className="red">*</span></label>
                        <input type="text" name="recipeName" id="recipeName" required minLength="5" onInput={changeRecipeName} />
                        {state.recipeName.status === 'empty' && <p className="error">Recipe name is required!</p>}
                        {state.recipeName.status === 'too-short' && <p className="error">Recipe name must be at least 3 characters long!</p>}
                    </div>
                    <div>
                        <label htmlFor="time">Cooking Time (Minutes) <span className="red">*</span></label>
                        <input type="number" name="time" id="time" required min="0" onInput={changeTime} />
                        {state.time.status === 'empty' && <p className="error">Recipe time is required!</p>}
                    </div>
                </div>
                <div className="ingredients">
                    <label htmlFor="ingredients">Ingredients (Comma-Separated) <span className="red">*</span></label>
                    <textarea type="text" name="ingredients" id="ingredients" rows="3" required
                        placeholder="Ingredient 1, Ingredient 2, Ingredient 3"
                        onInput={changeIngredients}>
                    </textarea>
                    {state.ingredients.status === 'empty' && <p className="error">Please enter ingredients for your recipe!</p>}
                </div>
                <div className="instructions">
                    <label htmlFor="instructions">Instructions <span className="red">*</span></label>
                    <textarea type="text" name="instructions" id="instructions" rows="3" required onInput={changeInstructions}>
                    </textarea>
                    {state.instructions.status === 'empty' && <p className="error">Please enter instructions for your recipe!</p>}
                </div>
                <div className="image">
                    <label htmlFor="imageUrl">Image URL <span className="red">*</span></label>
                    <input type="text" name="imageUrl" id="imageUrl" required placeholder="http(s)://" onInput={changeImageUrl} />
                    {state.imageUrl.status === 'empty' && <p className="error">Recipe image is required!</p>}
                    {state.imageUrl.status === 'invalid' && <p className="error">Please enter a valid URL!</p>}
                </div>
                <div className="buttons">
                    <Link to="/recipes" className="cancel button">Cancel</Link>
                    <button type="submit" className="submit button">Create a New Recipe</button>
                </div>
            </form >
        </div >
    );
}


export default NewRecipe;