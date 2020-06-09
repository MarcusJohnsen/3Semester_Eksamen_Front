import React, { useState } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Header } from "./Header";
import { External } from "./External";
import { LoginAndOut } from "./LoginAndOut";
import { Admin } from "./Admin";

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
            <Route path="/external">
              <External />
            </Route>
            <Route path="/admin-page">
              <Admin />
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
        I personally appreciate having easy and accessible startcode to use that
        I have been a part of modifying and making so that I understand how it
        works and am able to make corrections and use it as I please. One
        problem that I see is that our group startcode is heavily based on the
        classes and assignments previously made in school. Therefore it was
        hard, if not impossible, to work on setting it up together.
        <br />
        <br />
        Below is my cat:
      </p>
      <img
        src="https://scontent-cph2-1.xx.fbcdn.net/v/t1.15752-9/93422687_3546043795409696_8300053904729571328_n.jpg?_nc_cat=111&_nc_sid=b96e70&_nc_ohc=udR01Hm4tSAAX9CEJ6j&_nc_ht=scontent-cph2-1.xx&oh=54c886b49a4a2afe5469398d7d79de92&oe=5EC03DE7"
        alt="cat"
        style={{ width: 300, height: 380 }}
      />
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
