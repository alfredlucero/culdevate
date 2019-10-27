import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import RecapsPage from "./pages/Recaps";
import ImpactsPage from "./pages/Impacts";
import NavigationPublic from "./components/NavigationPublic";
import "./App.css";

const App = () => {
  // TODO: check for auth cookie to determine if we should redirect the user to login page from authenticated page
  // TODO: add navigation when authenticated
  return (
    <Router>
      <NavigationPublic />

      <Switch>
        {/* Public (Unauthenticated Routes) */}
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignupPage />
        </Route>

        {/* Authenticated Routes */}
        {/* TODO: Dashboard */}
        <Route path="/recaps">
          <RecapsPage />
        </Route>
        <Route path="/impacts">
          <ImpactsPage />
        </Route>
        {/* TODO: Reviews */}
      </Switch>
    </Router>
  );
};

export default App;
