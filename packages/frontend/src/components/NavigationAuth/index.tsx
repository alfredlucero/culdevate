import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import cn from "classnames";
import Link from "../Link";
import Button from "../Button";

export const AuthRoutes = {
  profile: "/profile",
  dashboard: "/dashboard",
  recaps: "/recaps",
  impacts: "/impacts",
  selfReviews: "/selfreviews",
};

const baseAuthLinkClasses = ["block px-4 py-5 text-xl hover:bg-teal-100"];
const activeAuthLinkClasses = ["border-r-4", "border-teal-500", "text-teal-800", "bg-teal-100"];

const isActiveRoute = (currentRoutePath: string, linkRoute: string): boolean => currentRoutePath.includes(linkRoute);

interface NavigationAuthProps {
  username: string;
  onLogOut: () => void;
}

// This must be under a BrowserRouter to use the useHistory hook
const NavigationAuth: React.FC<NavigationAuthProps> = ({ username, onLogOut }) => {
  const history = useHistory();
  const location = useLocation();

  const [currentRoutePath, setCurrentRoutePath] = useState(location.pathname);

  useEffect(() => {
    setCurrentRoutePath(location.pathname);
  }, [location.pathname]);

  const handleLogOut = () => {
    onLogOut();
    history.push("/");
  };

  return (
    <nav className="h-full bg-gray-100" data-testid="navigationAuth">
      <div
        className={cn(
          "flex",
          "justify-between",
          "items-center",
          "p-4",
          isActiveRoute(currentRoutePath, AuthRoutes.profile) ? activeAuthLinkClasses : [],
        )}
      >
        <Link
          type="internal"
          href="/profile"
          testId="profileAuthLink"
          className={cn(isActiveRoute(currentRoutePath, AuthRoutes.profile) ? "text-teal-800" : "")}
          data-active={isActiveRoute(currentRoutePath, AuthRoutes.profile) ? "true" : "false"}
        >
          {username}
        </Link>

        {/* TODO: Have a dropdown menu here */}
        <Button type="button" variant="secondary" onClick={handleLogOut} testId="logOutButton">
          Log Out
        </Button>
      </div>

      <ul>
        <li>
          <Link
            type="internal"
            href={AuthRoutes.dashboard}
            className={cn(
              baseAuthLinkClasses,
              isActiveRoute(currentRoutePath, AuthRoutes.dashboard) ? activeAuthLinkClasses : [],
            )}
            testId="dashboardAuthLink"
            data-active={isActiveRoute(currentRoutePath, AuthRoutes.dashboard) ? "true" : "false"}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            type="internal"
            href={AuthRoutes.recaps}
            className={cn(
              baseAuthLinkClasses,
              isActiveRoute(currentRoutePath, AuthRoutes.recaps) ? activeAuthLinkClasses : [],
            )}
            testId="recapsAuthLink"
            data-active={isActiveRoute(currentRoutePath, AuthRoutes.recaps) ? "true" : "false"}
          >
            Recaps
          </Link>
        </li>
        <li>
          <Link
            type="internal"
            href={AuthRoutes.impacts}
            className={cn(
              baseAuthLinkClasses,
              isActiveRoute(currentRoutePath, AuthRoutes.impacts) ? activeAuthLinkClasses : [],
            )}
            testId="impactsAuthLink"
            data-active={isActiveRoute(currentRoutePath, AuthRoutes.impacts) ? "true" : "false"}
          >
            Impacts
          </Link>
        </li>
        <li>
          <Link
            type="internal"
            href={AuthRoutes.selfReviews}
            className={cn(
              baseAuthLinkClasses,
              isActiveRoute(currentRoutePath, AuthRoutes.selfReviews) ? activeAuthLinkClasses : [],
            )}
            testId="selfReviewsAuthLink"
            data-active={isActiveRoute(currentRoutePath, AuthRoutes.selfReviews) ? "true" : "false"}
          >
            Self Reviews
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationAuth;
