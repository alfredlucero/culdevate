import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import LandingPage from "./pages/Landing";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ProfilePage from "./pages/Profile";
import DashboardPage from "./pages/Dashboard";
import RecapsPage from "./pages/Recaps";
import ImpactsPage from "./pages/Impacts";
import SelfReviewsPage from "./pages/SelfReviews";
import NavigationPublic, { PublicRoutes } from "./components/NavigationPublic";
import NavigationAuth, { AuthRoutes } from "./components/NavigationAuth";
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
              <Route exact path={PublicRoutes.landing}>
                <LandingPage />
              </Route>
              <Route exact path={PublicRoutes.login}>
                <LoginPage />
              </Route>
              <Route exact path={PublicRoutes.signup}>
                <SignupPage />
              </Route>
              {/* Redirect attempts to go to authenticated routes back to login page */}
              <Route path={AuthRoutes.dashboard}>
                <Redirect to={PublicRoutes.login} />
              </Route>
              <Route path={AuthRoutes.recaps}>
                <Redirect to={PublicRoutes.login} />
              </Route>
              <Route path={AuthRoutes.impacts}>
                <Redirect to={PublicRoutes.login} />
              </Route>
              <Route path={AuthRoutes.selfReviews}>
                <Redirect to={PublicRoutes.login} />
              </Route>
              <Route path={AuthRoutes.profile}>
                <Redirect to={PublicRoutes.login} />
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
              <Route path={AuthRoutes.profile}>
                <ProfilePage />
              </Route>
              <Route path={AuthRoutes.dashboard}>
                <DashboardPage />
              </Route>
              <Route path={AuthRoutes.recaps}>
                <RecapsPage />
              </Route>
              <Route path={AuthRoutes.impacts}>
                <ImpactsPage />
              </Route>
              <Route path={AuthRoutes.selfReviews}>
                <SelfReviewsPage />
              </Route>
              {/* Redirect public routes to an authenticated page if already logged in */}
              <Route path={PublicRoutes.landing}>
                <Redirect to={AuthRoutes.recaps}></Redirect>
              </Route>
              <Route path={PublicRoutes.login}>
                <Redirect to={AuthRoutes.recaps}></Redirect>
              </Route>
              <Route path={PublicRoutes.signup}>
                <Redirect to={AuthRoutes.recaps}></Redirect>
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
