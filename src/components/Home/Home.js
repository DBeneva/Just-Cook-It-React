import './Home.scss';

function Home() {
  return (
    <div className="Home">
      <p className="welcome-message main-title">Welcome to our very special place for sharing recipes!</p>
      <div className="buttons">
        <a className="button" href="#">See Recipes</a>
        <a className="button" href="#">Login</a>
        {/* <a className="button" href="#">Add New Recipe</a> */}
      </div>
    </div>
  );
}

export default Home;