import './Header.scss';

function Header() {
    return (
        <div className="Header">
            <div>
                <a className="logo main-title" href="#">Just c<img className="logo-egg" src="/fried-egg.png" alt="Egg" /><img className="logo-egg" src="/fried-egg.png" alt="Egg" />k it!</a>
            </div>

            <nav className="navigation">
                <ul>
                    <div>
                        <li className="navigation-list-item"><a className="button" href="#">Recipes</a></li>
                        <li className="navigation-list-item"><a className="button" href="#">Login</a></li>
                        <li className="navigation-list-item"><a className="button" href="#">Register</a></li>
                    </div>

                    <div>
                        {/* <li className="navigation-list-item" href="#"> <a href="#">Recipes</a></li >
                        <li className="navigation-list-item"><a href="#">New Recipe</a></li>
                        <li className="navigation-list-item"><a href="#">My Recipes</a></li>
                        <li className="navigation-list-item"><a href="#">My Favorites</a></li>
                        <li className="navigation-list-item"> <a href="#"><i className="fas fa-user"></i> John</a></li >
                        <li className="navigation-list-item button logout"> Logout</li > */}
                    </div >
                </ul >
            </nav >

        </div >
    );
}

{/* <div class="container">
    <div class="logo">
        <span routerLink="home">
            Just c<img src="assets/bar-1972444_1280.png" alt="egg" /><img
                src="assets/bar-1972444_1280.png" alt="egg" />k it!
            </span>
    </div>

    <nav class="navigation">
        <ul>
            
            <div *ngIf="!isLogged">
                <li routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"><a routerLink="recipes">Recipes</a></li>
                <li routerLinkActive="active"><a routerLink="login">Login</a></li>
                <li routerLinkActive="active"><a routerLink="register">Register</a></li>
            </div>
            
            <div *ngIf="isLogged">
                <li routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"><a routerLink="recipes">Recipes</a></li>
                <li routerLinkActive="active"><a routerLink="recipes/new-recipe">New Recipe</a></li>
                <li routerLinkActive="active"><a routerLink="recipes/my-recipes">My Recipes</a></li>
                <li routerLinkActive="active"><a routerLink="recipes/my-favorites">My Favorites</a></li>
                <li *ngIf="user" routerLinkActive="active"><a routerLink="/users/{{user._id}}"><i class="fas fa-user"></i> {{username}}</a></li>
                <li class="button logout" (click)="logout()" routerLinkActive="active">Logout</li>
            </div>
            
        </ul>
    </nav>
</div> */}

export default Header;