import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import './App.css';

import Home from './components/Home/Home';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import About from './components/About/About';
import Recipes from './components/recipe/Recipes/Recipes';
import Recipe from './components/recipe/Recipe/Recipe';
import Login from './components/user/Login/Login';
import Register from './components/user/Register/Register';
import Logout from './components/user/Logout/Logout';
import NewRecipe from './components/recipe/NewRecipe/NewRecipe';
import EditRecipe from './components/recipe/EditRecipe/EditRecipe';
import GuardedRoute from './components/common/GuardedRoute/GuardedRoute';
import MyRecipes from './components/recipe/MyRecipes/MyRecipes';
import MyFavorites from './components/recipe/MyFavorites/MyFavorites';
import Account from './components/user/account/Account/Account';
import EditAccount from './components/user/account/EditAccount/EditAccount';
import ChangePassword from './components/user/account/ChangePassword/ChangePassword';

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
            <Route path="/recipes/new-recipe" element={<NewRecipe />} />
            <Route path="/recipes/my-recipes" element={<MyRecipes />} />
            <Route path="/recipes/my-favorites" element={<MyFavorites />} />
            <Route path="/users/:userId" element={<Account />} />
            <Route path="/users/:userId/edit" element={<EditAccount />} />
            <Route path="/users/:userId/change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>

        <Footer></Footer>
      </div>
    </AuthProvider>
  );
}

export default App;
