import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import RecapsPage from "./pages/Recaps";
import ImpactsPage from "./pages/Impacts";
import "./App.css";

const App = () => {
  return (
    <Router>
      <h1 className="font-mono text-4xl text-gray-800">Culdevate</h1>

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
        <Route path="/recaps">
          <RecapsPage />
        </Route>
        <Route path="/impacts">
          <ImpactsPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
