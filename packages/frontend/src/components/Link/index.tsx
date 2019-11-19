import React from "react";
import { Link as RouterLink } from "react-router-dom";
import cn from "classnames";
import { CommonProps } from "../commonProps";

interface LinkProps extends CommonProps {
  href: string;
  type: "internal" | "external";
  children: React.ReactNode;
}

const linkBaseClasses = ["font-bold", "text-teal-500", "hover:text-teal-800"];

const Link: React.FC<LinkProps> = ({ href, type, children, testId = "", className = "", ...passThroughProps }) => {
  // Internal links utilize the React Router links to navigate
  // to our SPA routes
  // These should be relative paths i.e. /login
  if (type === "internal") {
    return (
      <RouterLink
        to={href}
        className={cn(linkBaseClasses, className)}
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
        className={cn(linkBaseClasses, className)}
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
