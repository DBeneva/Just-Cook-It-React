import './Recipe.scss';

function Recipe({
  recipe
}) {
  return (
    <div className="card">
      <img className="card-image" src="{{recipe.imageUrl}}" alt="" />
      <div className="card-content">
        <div className="card-title">
          <h3>{recipe.name}</h3>
          <p>
            <i className="fas fa-clock"></i><span> {recipe.time} min</span>
          </p>
        </div>
        <div className="likes">
          <p>Liked by <span>{recipe.likedBy.length}</span> people</p>
          <p >Liked by <span>{recipe.likedBy.length}</span> person</p>
        </div>
      </div>
    </div>
  );
}

export default Recipe;

{/* <div class="container">
    <app-delete-recipe [recipeName]="recipe.name" [recipeId]="recipe._id" (hideModal)="showDeleteModal(false)" *ngIf="isDeletingRecipe"></app-delete-recipe>
    <div class="back-btn"><i (click)="back()" class="fa fa-arrow-circle-left"></i></div>
    <ng-container *ngIf="error">
        <p class="error">
            {{error}}
        </p>
    </ng-container>

    <div *ngIf="recipe" class="card">
        <div class="card-image"><img src="{{recipe.imageUrl}}" alt="Recipe Image"></div>
        <div class="card-content">
            <div class="card-title">
                <h3>{{recipe.name}}</h3>
                <p>
                    <i class="fas fa-clock"></i><span> {{recipe.time}} min</span>
                </p>
            </div>
            <table>
                <tr class="card-section">
                    <td>
                        <h4><i class="fas fa-list"></i></h4>
                    </td>
                    <td>
                        <!-- <p class="ingredients">{{recipe.ingredients}}</p> -->
                        <ul class="ingredients-section">
                            <li class="ingredients-item" *ngFor="let item of recipe.ingredients.split(', ')">{{item}}</li>
                        </ul>
                    </td>
                </tr>
                <tr class="card-section">
                    <td>
                        <h4><img src="/assets/instructions.png" alt="Instructions"></h4>
                    </td>
                    <td>
                        <div class="instructions">
                            <p *ngFor="let paragraph of recipe.instructions.split('\n')">{{paragraph}}</p>
                        </div>
                        <!-- <p class="instructions">{{recipe.instructions}}</p> -->
                    </td>
                </tr>
            </table>
            <div class="likes">
                <div>
                    <p *ngIf="recipe.likedBy.length != 1">Liked by <span>{{recipe.likedBy.length}}</span> people</p>
                    <p *ngIf="recipe.likedBy.length == 1">Liked by <span>{{recipe.likedBy.length}}</span> person</p>
                </div>
                <button *ngIf="recipe.isUser && !recipe.isOwner && !recipe.hasLiked" class="like" (click)="likeRecipe(recipe._id)">
                    Like <i class="fas fa-thumbs-up"></i></button>
                <button *ngIf="recipe.isUser && !recipe.isOwner && recipe.hasLiked" class="unlike" (click)="unlikeRecipe(recipe._id)">
                    Unlike <i class="fas fa-thumbs-down"></i></button>
                <div class="owner-buttons" *ngIf="recipe.isOwner">
                    <button class="edit-btn" routerLink="/recipes/{{recipe._id}}/edit">Edit</button>
                    <button class="delete-btn" (click)="showDeleteModal(true)">Delete <i class="fa fa-trash"></i></button>
                </div>
            </div>
        </div>
    </div>
    <div *ngIf="!recipe" class="loader"></div>
</div> */}