import React from "react";
import { Link as RouterLink } from "react-router-dom";
import cn from "classnames";
import { CommonProps } from "../commonProps";
import "./index.css";

interface LinkProps extends CommonProps {
  href: string;
  type: "internal" | "external";
  children: React.ReactNode;
}

const Link: React.FC<LinkProps> = ({ href, type, children, testId = "", className = "", ...passThroughProps }) => {
  // Internal links utilize the React Router links to navigate
  // to our SPA routes
  // These should be relative paths i.e. /login
  if (type === "internal") {
    return (
      <RouterLink
        to={href}
        className={cn("link", className)}
        {...(testId !== "" ? { "data-testid": testId } : {})}
        {...passThroughProps}
      >
        {children}
      </RouterLink>
    );
  }

  // External links are normal <a> tags that are meant to go outside of our app domain
  // and open in another tab
  // These should be full external links i.e. https://domain.com
  if (type === "external") {
    return (
      <a
        href={href}
        className={cn("link", className)}
        target="_blank"
        rel="noopener noreferrer"
        {...(testId !== "" ? { "data-testid": testId } : {})}
        {...passThroughProps}
      >
        {children}
      </a>
    );
  }

  return null;
};

export default Link;
