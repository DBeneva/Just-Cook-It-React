import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import './App.css';

import Home from './components/Home/Home';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import About from './components/About/About';
import Recipes from './components/Recipe/Recipes/Recipes';
import Recipe from './components/Recipe/Recipe/Recipe';
import Login from './components/user/Login/Login';
import Register from './components/user/Register/Register';
import Logout from './components/user/Logout/Logout';
import NewRecipe from './components/Recipe/NewRecipe/NewRecipe';
import EditRecipe from './components/Recipe/EditRecipe/EditRecipe';
import GuardedRoute from './components/common/GuardedRoute/GuardedRoute';
import PrivateRoute from './components/common/PrivateRoute/PrivateRoute';
import MyRecipes from './components/Recipe/MyRecipes/MyRecipes';

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
          <Route path="/recipes/:recipeId/edit" element={<EditRecipe />} />
          <Route element={<GuardedRoute />}>
            <Route path="/recipes/new-recipe" element={<NewRecipe />} />
            <Route path="/recipes/my-recipes" element={<MyRecipes />} />
          </Route>
          <Route element={<PrivateRoute />}>
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
