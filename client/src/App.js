import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import './sassStyles/index.scss';

import Home from './components/static/Home/Home';
import Header from './components/static/Header/Header';
import Footer from './components/static/Footer/Footer';
import About from './components/static/About/About';
import Recipes from './components/recipe/Recipes/Recipes';
import Recipe from './components/recipe/Recipe/Recipe';
import Login from './components/user/Login/Login';
import Register from './components/user/Register/Register';
import Logout from './components/user/Logout/Logout';
import NewRecipe from './components/recipe/NewRecipe/NewRecipe';
import EditRecipe from './components/recipe/EditRecipe/EditRecipe';
import GuardedRoute from './components/routing/GuardedRoute/GuardedRoute';
import MyRecipes from './components/recipe/MyRecipes/MyRecipes';
import MyFavorites from './components/recipe/MyFavorites/MyFavorites';
import Account from './components/user/account/Account/Account';
import EditAccount from './components/user/account/EditAccount/EditAccount';
import ChangePassword from './components/user/account/ChangePassword/ChangePassword';
import NotFound from './components/static/NotFound/NotFound';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header></Header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recipes/" element={<Recipes />} />
          <Route path="/recipes/:recipeId" element={<Recipe />} />
          <Route element={<GuardedRoute />}>
            <Route path="/recipes/:recipeId/edit" element={<EditRecipe />} />
            <Route path="/new-recipe" element={<NewRecipe />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
            <Route path="/my-favorites" element={<MyFavorites />} />
            <Route path="/users/:userId" element={<Account />} />
            <Route path="/users/:userId/edit" element={<EditAccount />} />
            <Route path="/users/:userId/change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer></Footer>
      </div>
    </AuthProvider>
  );
}

export default App;
