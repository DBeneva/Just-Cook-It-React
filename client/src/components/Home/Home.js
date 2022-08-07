import './Home.scss';

function Home() {
  return (
    <div className="Home">
      <h1 className="welcome-message title">Welcome to our very special place for sharing recipes!</h1>
      <div className="buttons">
        <a className="button" href="/recipes">See Recipes</a>
        <a className="button" href="/login">Login</a>
        {/* <a className="button" href="#">Add New Recipe</a> */}
      </div>
    </div>
  );
}

export default Home;