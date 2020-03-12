import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { signupUserSchema } from "../../auth/auth.schema";
import { signup } from "../../auth/auth.service";
import { SignupUser } from "../../auth/auth.interface";
import { ResponseError } from "../../interfaces/responseError.interface";
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import Card from "../../components/Card";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Link from "../../components/Link";
import { useAuth } from "../../AuthProvider";
import "./index.css";

const SignupPage = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { saveAuthToken } = useAuth();
  const [signupError, setSignupError] = useState("");
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: values => {
      const signupUser: SignupUser = {
        username: values.username,
        email: values.email,
        password: values.password,
      };

      setIsSigningUp(true);

      signup(signupUser)
        .then(response => {
          setIsSigningUp(false);
          setIsAuthenticated(true);
          saveAuthToken(response.data.token);
        })
        .catch((error: AxiosError<ResponseError>) => {
          const signupError = (error.response && error.response.data.message) || "Signup failed. Please try again!";
          setSignupError(signupError);
          setIsSigningUp(false);
        });
    },
    validationSchema: signupUserSchema,
  });

  // TODO: redirect to referrer page
  if (isAuthenticated) {
    return <Redirect to="/recaps" />;
  }

  const isSignupDisabled =
    Boolean(errors.username || errors.email || errors.password || errors.confirmPassword) ||
    values.username === "" ||
    values.email === "" ||
    values.password === "" ||
    values.confirmPassword === "";

  return (
    <div data-testid="signupPage" className="flex justify-center bg-gray-100 h-full p-6">
      <div className="signup flex flex-col justify-center">
        <div className="text-center mb-4">
          <Heading variant="h2" className="mb-3">
            Signup
          </Heading>
          <Text variant="p">Start cultivating your development!</Text>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <TextInput
              type="text"
              value={values.username}
              placeholder="Please enter a username..."
              label="Username"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              testId="usernameInput"
              id="username"
              valid={!touched.username || !errors.username}
              errorInfo={errors.username}
              className="mb-4"
            />

            <TextInput
              type="text"
              value={values.email}
              placeholder="Please enter an email address..."
              label="Email"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              testId="emailInput"
              id="email"
              valid={!touched.email || !errors.email}
              errorInfo={errors.email}
              className="mb-4"
            />

            <TextInput
              type="password"
              value={values.password}
              placeholder="Please enter a password..."
              label="Password"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              testId="passwordInput"
              id="password"
              valid={!touched.password || !errors.password}
              errorInfo={errors.password}
              className="mb-6"
            />

            <TextInput
              type="password"
              value={values.confirmPassword}
              placeholder="Please re-enter your password..."
              label="Confirm Password"
              required={true}
              onChange={handleChange}
              onBlur={handleBlur}
              testId="confirmPasswordInput"
              id="confirmPassword"
              valid={!touched.confirmPassword || !errors.confirmPassword}
              errorInfo={errors.confirmPassword}
              className="mb-6"
            />

            <Button
              variant="primary"
              type="submit"
              onClick={() => {}}
              testId="signupButton"
              disabled={isSignupDisabled || isSigningUp}
              className="w-full"
            >
              {isSigningUp && <>Signing Up...</>}
              {!isSigningUp && <>Sign Up</>}
            </Button>
          </form>
          {signupError !== "" && (
            <Text variant="p" testId="signupError">
              {signupError}
            </Text>
          )}
        </Card>
        <Text variant="p" small={true} className="mt-2">
          Already have an account?{" "}
          <Link href="/login" type="internal" testId="alreadyHaveAccountLink" className="text-sm">
            Log in!
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default SignupPage;
