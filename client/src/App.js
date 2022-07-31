import './App.css';
import Home from './components/Home/Home';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import About from './components/About/About';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Home />
      {/* <About /> */}
      <Footer></Footer>
    </div>
  );
}

export default App;
