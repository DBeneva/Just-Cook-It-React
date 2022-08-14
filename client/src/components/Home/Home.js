import { Link } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';
import './Home.scss';

function Home() {
  const { user } = useAuthContext();

  return (
    <div className="Home">
      <h1 className="welcome-message title">Welcome to our very special place for sharing recipes!</h1>
      <div className="buttons">
        <Link className="button" to="/recipes">See Recipes</Link>
        {
          user.username
            ? <Link className="button" to="/recipes/new-recipe">Add New Recipe</Link>
            : <Link className="button" to="/login">Login</Link>
        }
      </div>
    </div>
  );
}

export default Home;