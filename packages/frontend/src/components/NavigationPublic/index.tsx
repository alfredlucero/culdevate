import React from "react";
import { Link } from "react-router-dom";
import Heading from "../Heading";
import Button from "../Button";

const NavigationPublic = () => {
  return (
    <nav className="p-6 flex justify-between">
      <Heading variant="h1">
        <Link to="/">culdevate</Link>
      </Heading>

      <div>
        <Link to="/login">
          <Button variant="secondary" onClick={() => {}} testId="navLoginButton">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="primary" onClick={() => {}} testId="navSignupButton">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavigationPublic;
