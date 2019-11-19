import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { AxiosError } from "axios";
import { useFormik } from "formik";
import { userCredentialsSchema } from "../../validations/user.schema";
import { login } from "../../services/auth.service";
import { UserCredentials } from "../../interfaces/auth.interface";
import { ResponseError } from "../../interfaces/responseError.interface";
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import Card from "../../components/Card";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Link from "../../components/Link";
import { useAuth } from "../../AuthProvider";
import "./index.css";

const LoginPage = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { saveAuthToken } = useAuth();
  const [loginError, setLoginError] = useState("");
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: values => {
      const userCredentials: UserCredentials = {
        username: values.username,
        password: values.password,
      };

      setIsLoggingIn(true);

      login(userCredentials)
        .then(response => {
          setIsLoggingIn(false);
          setIsAuthenticated(true);
          saveAuthToken(response.data.token);
        })
        .catch((error: AxiosError<ResponseError>) => {
          const loginError =
            (error.response && error.response.data.message) || "Login failed due to some issue. Please try again!";
          setLoginError(loginError);
          setIsLoggingIn(false);
        });
    },
    validationSchema: userCredentialsSchema,
  });

  // TODO: redirect to referrer page
  if (isAuthenticated) {
    return <Redirect to="/recaps" />;
  }

  const isLogInDisabled =
    Boolean(errors.password || errors.username) || values.username === "" || values.password === "";

  return (
    <div data-testid="loginPage" className="flex justify-center bg-gray-100 h-full">
      <div className="login flex flex-col justify-center">
        <div className="text-center mb-4">
          <Heading variant="h2" className="mb-3">
            Login
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

            <div className="flex justify-between items-center">
              <Button
                variant="primary"
                type="submit"
                onClick={() => {}}
                testId="loginButton"
                disabled={isLogInDisabled || isLoggingIn}
              >
                {isLoggingIn && <>Logging In...</>}
                {!isLoggingIn && <>Log In</>}
              </Button>

              <Link href="#" type="internal" testId="forgotPasswordLink" className="text-sm">
                Forgot your password?
              </Link>
            </div>
          </form>
          {loginError !== "" && (
            <Text variant="p" testId="loginError">
              {loginError}
            </Text>
          )}
        </Card>
        <Text variant="p" small={true} className="mt-2">
          Need to create an account?{" "}
          <Link href="/signup" type="internal" testId="createAccountLink" className="text-sm">
            Sign up now!
          </Link>
        </Text>
      </div>
    </div>
  );
};

export default LoginPage;
