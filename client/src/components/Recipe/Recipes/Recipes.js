import { NavLink } from 'react-router-dom';
import Recipe from '../Recipe/Recipe';
import './Recipes.scss';

function Recipes({
    recipes
}) {
    const noRecipes = (
        <div className="no-recipes">
            <h2>Sorry, there are currently no recipes.</h2>
            <div>
                <p>Be the first to add one!</p>
                <NavLink to="/recipes/new-recipe">Add New Recipe</NavLink>
                <NavLink to="/">Go back home</NavLink>
            </div>
            <div>
                <NavLink to="/">Go back home</NavLink>
            </div>
        </div>
    );

    return (
        <div className="Recipes">
            {recipes?.length > 0
                ? (
                    <ul className="">
                        {recipes.map(r => <Recipe key={r._id} recipe={r} />)}
                    </ul>
                )
                : noRecipes
            }
            <div className="loader"></div>
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
                <p *ngIf="recipe.likedBy.length != 1">Liked by <span>{{recipe.likedBy.length}}</span> people</p>
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