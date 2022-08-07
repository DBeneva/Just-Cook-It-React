import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Recipes.scss';
import * as contentService from '../../../services/contentService';
import { useAuthContext } from '../../../contexts/AuthContext';
import RecipeCard from '../RecipeCard/RecipeCard';

function Recipes({}) {
    const [recipes, setRecipes] = useState([]);
    // const navigate = useNavigate();
    // console.log('user', useAuthContext().user);
    // const { user } = useAuthContext();
    let user = undefined;

    useEffect(() => {
        contentService.loadRecipes()
            .then(recipes => {
                console.log('recipes', recipes);
                setRecipes(recipes);
            })
            .catch(err => {
                console.log(`Error: ${err}`);
            });
    }, []);

    const noRecipes = (
        <div className="no-recipes">
            <h2 className="title">Sorry, there are currently no recipes.</h2>
            {user
                ? (
                    <div>
                        <p>Be the first to add one!</p>
                        <NavLink className="button" to="/recipes/new-recipe">Add New Recipe</NavLink>
                        <NavLink className="button" to="/">Go back home</NavLink>
                    </div>
                )
                :
                (<div>
                    <NavLink className="button" to="/">Go back home</NavLink>
                </div>)
            }
        </div>
    );

    return (
        <div className="Recipes">
            {recipes?.length > 0
                ? recipes.map(r => <RecipeCard key={r._id} recipe={r} />)
                : recipes && recipes.length == 0
                    ? noRecipes
                    : <div className="loader"></div>
            }
        </div>
    );
}

export default Recipes;

{/* <div class="recipes">
    <div class="card" [routerLink]="['/recipes', recipe._id]" *ngFor="let recipe of recipes">
        <!-- {{recipes | json}} -->
        <img class="card-image" src="{{recipe.imageUrl}}" alt="">
        <div class="card-content">
            <div class="card-title">
                <h3>{{recipe.name}}</h3>
                <p>
                    <i class="fas fa-clock"></i><span> {{recipe.time}} min</span>
                </p>
            </div>
            <div class="likes">
                <p *ngIf="recipe.likedBy.length !== 1">Liked by <span>{{recipe.likedBy.length}}</span> people</p>
                <p *ngIf="recipe.likedBy.length == 1">Liked by <span>{{recipe.likedBy.length}}</span> person</p>
            </div>
        </div>
    </div>
    <div *ngIf="recipes && recipes.length == 0" class="no-recipes">
        <h2>Sorry, there are currently no recipes.</h2>
        <div *ngIf="user">
            <p>Be the first to add one!</p>
            <button routerLink="/recipes/new-recipe">Add New Recipe</button>
            <button routerLink="/">Go back home</button>
        </div>
        <div *ngIf="!user">
            <button routerLink="/">Go back home</button>
        </div>
    </div>
    <div *ngIf="!recipes" class="loader"></div>
</div> */}