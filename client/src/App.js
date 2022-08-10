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
import NewRecipe from './components/Recipe/New-Recipe/New-Recipe';

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
          <Route path="/new-recipe" element={<NewRecipe />} />
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
