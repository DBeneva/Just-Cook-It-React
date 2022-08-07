import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home/Home';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import About from './components/About/About';
import Recipes from './components/Recipe/Recipes/Recipes';
import Recipe from './components/Recipe/Recipe/Recipe';
import { AuthProvider } from './contexts/AuthContext';

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

        </Routes>

        <Footer></Footer>
      </div>
    </AuthProvider>
  );
}

export default App;
