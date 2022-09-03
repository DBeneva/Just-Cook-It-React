import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import * as contentService from '../../../services/contentService';
import getNameStatus from '../../../utils/getNameStatus';
import getRequiredInputStatus from '../../../utils/getRequiredInputStatus';
import getUrlStatus from '../../../utils/getUrlStatus';
import isFormStatusValid from '../../../utils/isFormStatusValid';
import '../../recipe/recipeForm.scss';

function NewRecipe() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const initialState = {
        recipeName: { value: '', status: 'untouched' },
        time: { value: '', status: 'untouched' },
        ingredients: { value: '', status: 'untouched' },
        instructions: { value: '', status: 'untouched' },
        imageUrl: { value: '', status: 'untouched' },
        submitDisabled: true
    };

    const [state, setState] = useState(initialState);

    useEffect(() => {
        setState(oldState => ({
            ...oldState,
            submitDisabled: !isFormStatusValid(state, 'new-recipe')
        }));
    }, [state.recipeName.status, state.time.status, state.ingredients.status, state.instructions.status, state.imageUrl.status]);


    const changeRecipeName = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getNameStatus(currentInput);

        setState(oldState => ({
            ...oldState,
            recipeName: { value: currentInput, status: currentStatus }
        }));
    };

    const changeTime = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getRequiredInputStatus(currentInput);

        setState(oldState => ({
            ...oldState,
            time: { value: currentInput, status: currentStatus }
        }));
    };

    const changeIngredients = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getRequiredInputStatus(currentInput);

        setState(oldState => ({
            ...oldState,
            ingredients: { value: currentInput, status: currentStatus }
        }));
    };

    const changeInstructions = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getRequiredInputStatus(currentInput);

        setState(oldState => ({
            ...oldState,
            instructions: { value: currentInput, status: currentStatus }
        }));
    };

    const changeImageUrl = (e) => {
        const currentInput = e.target.value;
        const currentStatus = getUrlStatus(currentInput);

        setState(oldState => ({
            ...oldState,
            imageUrl: { value: currentInput, status: currentStatus }
        }));
    };

    const createRecipe = (e) => {
        e.preventDefault();

        const recipeData = {
            recipeName: state.recipeName.value,
            time: state.time.value,
            ingredients: state.ingredients.value,
            instructions: state.instructions.value,
            imageUrl: state.imageUrl.value
        };

        contentService.saveRecipe(recipeData)
            .then(() => {
                navigate('/recipes');
            })
            .catch(err => {
                setError(err);
                console.error(err);
            });
    };

    return (
        <div className="recipe-form">
            <div className="page-title">
                <h2 className="title">New Recipe</h2>
            </div>

            {error && <p className="error">{error.message}</p>}

            <form className="form-recipe" onSubmit={createRecipe}>
                <div className="title-time">
                    <div className="recipe-title">
                        <label htmlFor="recipeName" className="label-recipe">Title <span className="error">*</span></label>
                        <input
                            className={`input input-${state.recipeName.status}`}
                            type="text"
                            name="recipeName"
                            id="recipeName"
                            required
                            onFocus={changeRecipeName}
                            onChange={changeRecipeName}
                        />
                        {state.recipeName.status === 'invalid empty' && <p className="error">Recipe name is required!</p>}
                        {state.recipeName.status === 'invalid too-short' && <p className="error">Recipe name must be at least 3 characters long!</p>}
                    </div>

                    <div>
                        <label htmlFor="time" className="label-recipe">Cooking Time (Minutes) <span className="error">*</span></label>
                        <input
                            className={`input input-${state.time.status}`}
                            type="number"
                            name="time"
                            id="time"
                            required
                            min="0"
                            onFocus={changeTime}
                            onChange={changeTime}
                        />
                        {state.time.status === 'invalid empty' && <p className="error">Recipe time is required!</p>}
                    </div>
                </div>

                <div className="ingredients">
                    <label htmlFor="ingredients" className="label-recipe">Ingredients (Comma-Separated) <span className="error">*</span></label>
                    <textarea
                        className={`input input-${state.ingredients.status}`}
                        type="text"
                        name="ingredients"
                        id="ingredients"
                        rows="3"
                        required
                        placeholder="Ingredient 1, Ingredient 2, Ingredient 3"
                        onFocus={changeIngredients}
                        onChange={changeIngredients}
                    >
                    </textarea>
                    {state.ingredients.status === 'invalid empty' && <p className="error">Please enter ingredients for your recipe!</p>}
                </div>

                <div className="instructions">
                    <label htmlFor="instructions" className="label-recipe">Instructions <span className="error">*</span></label>
                    <textarea
                        className={`input input-${state.instructions.status}`}
                        type="text"
                        name="instructions"
                        id="instructions"
                        rows="10"
                        required
                        onFocus={changeInstructions}
                        onChange={changeInstructions}
                    >
                    </textarea>
                    {state.instructions.status === 'invalid empty' && <p className="error">Please enter instructions for your recipe!</p>}
                </div>

                <div className="image">
                    <label htmlFor="imageUrl" className="label-recipe">Image URL <span className="error">*</span></label>
                    <input
                        className={`input input-${state.imageUrl.status} password`}
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        required
                        placeholder="http(s)://"
                        onFocus={changeImageUrl}
                        onChange={changeImageUrl}
                    />
                    {state.imageUrl.status === 'invalid empty' && <p className="error">Recipe image is required!</p>}
                    {state.imageUrl.status === 'invalid' && <p className="error">Please enter a valid URL!</p>}
                </div>

                <div className="buttons">
                    <Link to="/recipes" className="cancel-btn button">Cancel</Link>
                    <button type="submit" className="submit button" disabled={state.submitDisabled}>Create a New Recipe</button>
                </div>
            </form >
        </div >
    );
}

export default NewRecipe;