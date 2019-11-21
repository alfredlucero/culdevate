import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import RecapsPage from "./pages/Recaps";
import ImpactsPage from "./pages/Impacts";
import NavigationPublic from "./components/NavigationPublic";
import NavigationAuth from "./components/NavigationAuth";
import { useAuth } from "./AuthProvider";
import "./App.css";

const App = () => {
  const { isAuthenticated, logOut } = useAuth();

  return (
    <Router>
      {!isAuthenticated() && (
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
              {/* Redirect attempts to go to authenticated routes back to login page */}
              <Route path="/dashboard">
                <Redirect to="/login" />
              </Route>
              <Route path="/recaps">
                <Redirect to="/login" />
              </Route>
              <Route path="/impacts">
                <Redirect to="/login" />
              </Route>
              <Route path="/selfreviews">
                <Redirect to="/login" />
              </Route>
              <Route path="/profile">
                <Redirect to="/login" />
              </Route>
              {/* TODO: show a 404 page here for no matching route */}
              <Route path="*">
                <div>404 not found</div>
              </Route>
            </Switch>
          </main>
        </div>
      )}

      {isAuthenticated() && (
        <div className="culdevate-root-auth">
          <div className="culdevate-nav-auth">
            <NavigationAuth username="alfienity" onLogOut={logOut} />
          </div>

          <main role="main" className="culdevate-main-auth">
            <Switch>
              <Route path="/dashboard"></Route>
              <Route path="/recaps">
                <RecapsPage />
              </Route>
              <Route path="/impacts">
                <ImpactsPage />
              </Route>
              <Route path="/selfreviews"></Route>
              <Route path="/profile"></Route>
              {/* Redirect public routes to an authenticated page if already logged in */}
              <Route path="/">
                <Redirect to="/recaps"></Redirect>
              </Route>
              <Route path="/login">
                <Redirect to="/recaps"></Redirect>
              </Route>
              <Route path="/signup">
                <Redirect to="/recaps"></Redirect>
              </Route>
              {/* TODO: show a 404 page here for no matching route */}
              <Route path="*">
                <div>404 not found</div>
              </Route>
            </Switch>
          </main>
        </div>
      )}
    </Router>
  );
};

export default App;
