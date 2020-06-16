import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./Header";
import { AllRecipes } from "./ViewRecipes";
import { AddRecipe } from "./AddRecipe";
import { LoginAndOut } from "./LoginAndOut";

export default App;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const setLoginStatus = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <Router>
      <div>
        <Header
          loginMsg={isLoggedIn ? "Logout" : "Login"}
          isLoggedIn={isLoggedIn}
        />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/viewRecipes">
              <AllRecipes />
            </Route>
            <Route path="/addRecipe">
              <AddRecipe />
            </Route>
            <Route path="/login-out">
              <LoginAndOut
                loginMsg={isLoggedIn ? "Logout" : "Login"}
                isLoggedIn={isLoggedIn}
                setLoginStatus={setLoginStatus}
              />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h1>Home: Edition Marcus</h1>
      <p style={{ width: 750 }}>
        Welcome to chef Marcus's recipe website! I hope you'll find some
        delicious recipes here and enjoy your time!
      </p>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>How did you get here? You shouldn't be here..</h2>
    </div>
  );
}
