import React from "react";
import { Link } from "react-router-dom";
import Heading from "../Heading";
import Button from "../Button";

const NavigationPublic = () => {
  return (
    <nav className="p-3 flex justify-between items-center">
      <Heading variant="h1">
        <Link to="/">culdevate</Link>
      </Heading>

      <div>
        <Link to="/login">
          <Button type="button" className="mr-2" variant="secondary" onClick={() => {}} testId="navLoginButton">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button type="button" variant="primary" onClick={() => {}} testId="navSignupButton">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default NavigationPublic;
