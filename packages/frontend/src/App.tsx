import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import RecapsPage from "./pages/Recaps";
import ImpactsPage from "./pages/Impacts";
import NavigationPublic from "./components/NavigationPublic";
import NavigationAuth from "./components/NavigationAuth";
import "./App.css";

const App = () => {
  // TODO: check for auth cookie to determine if we should redirect the user to login page from authenticated page
  // TODO: add navigation when authenticated
  const isAuthenticated = false;

  return (
    <Router>
      {!isAuthenticated && (
        <div className="culdevate-root-public">
          <div className="culdevate-nav-public">
            <NavigationPublic />
          </div>

          <main role="main" className="culdevate-main-public">
            <Switch>
              <Route exact path="/">
                <LandingPage />
              </Route>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/signup">
                <SignupPage />
              </Route>
            </Switch>
          </main>
        </div>
      )}

      {isAuthenticated && (
        <div className="culdevate-root-auth">
          <div className="culdevate-nav-auth">
            <NavigationAuth />
          </div>

          <main role="main" className="culdevate-main-auth">
            <Switch>
              {/* TODO: Dashboard */}
              <Route path="/recaps">
                <RecapsPage />
              </Route>
              <Route path="/impacts">
                <ImpactsPage />
              </Route>
              {/* TODO: Reviews */}
            </Switch>
          </main>
        </div>
      )}
    </Router>
  );
};

export default App;
