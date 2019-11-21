import React from "react";
import { MemoryRouter, Switch, Route } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import SignupPage from "./index";
import { usernameErrors, emailErrors, passwordErrors, confirmPasswordErrors } from "../../validations/user.schema";

jest.mock("axios");
const axiosMock = axios as jest.Mocked<typeof axios>;

describe("<SignupPage />", () => {
  test("should render without error", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );
    expect(getByTestId("signupPage")).toBeVisible();
  });

  test("should redirect to login route when clicking already have an account link", async () => {
    const { getByTestId, container } = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Switch>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/login">
            <div>Login Page</div>
          </Route>
        </Switch>
      </MemoryRouter>,
    );

    fireEvent.click(getByTestId("alreadyHaveAccountLink"));

    expect(container.innerHTML).toContain("Login Page");
  });

  test("should show inline error and disabled signup button for invalid username", async () => {
    const { getByTestId, findByText } = render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );

    fireEvent.change(getByTestId("usernameInput"), { target: { value: "a" } });
    fireEvent.blur(getByTestId("usernameInput"));

    const usernameError = await findByText(usernameErrors.lessThanMin);

    expect(usernameError).toBeVisible();
    expect(getByTestId("signupButton")).toBeDisabled();
  });

  test("should show inline error and disabled signup button for invalid email", async () => {
    const { getByTestId, findByText } = render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );

    fireEvent.change(getByTestId("emailInput"), { target: { value: "invalid" } });
    fireEvent.blur(getByTestId("emailInput"));

    const emailError = await findByText(emailErrors.email);

    expect(emailError).toBeVisible();
    expect(getByTestId("signupButton")).toBeDisabled();
  });

  test("should show inline error and disabled signup button for invalid password", async () => {
    const { getByTestId, findByText } = render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );

    fireEvent.change(getByTestId("passwordInput"), { target: { value: "2short" } });
    fireEvent.blur(getByTestId("passwordInput"));

    const passwordError = await findByText(passwordErrors.lessThanMin);

    expect(passwordError).toBeVisible();
    expect(getByTestId("signupButton")).toBeDisabled();
  });

  test("should show inline error and disabled signup button for mismatched passwords", async () => {
    const { getByTestId, findByText } = render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );

    fireEvent.change(getByTestId("confirmPasswordInput"), { target: { value: "mismatch" } });
    fireEvent.blur(getByTestId("confirmPasswordInput"));

    const confirmPasswordError = await findByText(confirmPasswordErrors.mismatch);

    expect(confirmPasswordError).toBeVisible();
    expect(getByTestId("signupButton")).toBeDisabled();
  });

  test("should redirect to authenticated page after submitting valid, signup fields", async () => {
    const { getByTestId, findByText } = render(
      <MemoryRouter initialEntries={["/signup"]}>
        <Switch>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/recaps">
            <div>Recaps</div>
          </Route>
        </Switch>
      </MemoryRouter>,
    );

    fireEvent.change(getByTestId("usernameInput"), { target: { value: "validusername" } });
    fireEvent.blur(getByTestId("usernameInput"));

    fireEvent.change(getByTestId("emailInput"), { target: { value: "validemail@domain.com" } });
    fireEvent.blur(getByTestId("emailInput"));

    const password = "password123";
    fireEvent.change(getByTestId("passwordInput"), { target: { value: password } });
    fireEvent.blur(getByTestId("passwordInput"));

    fireEvent.change(getByTestId("confirmPasswordInput"), { target: { value: password } });
    fireEvent.blur(getByTestId("confirmPasswordInput"));

    expect(getByTestId("signupButton")).not.toBeDisabled();

    // Mock out a successful signup response
    axiosMock.post.mockResolvedValueOnce(Promise.resolve({ data: { token: "culdevate_auth_token" } }));
    fireEvent.click(getByTestId("signupButton"));

    const recapsPage = await findByText("Recaps");
    expect(recapsPage).toBeVisible();
  });

  test("should show signup error after failing to sign up", async () => {
    const { getByTestId, findByTestId } = render(
      <MemoryRouter>
        <SignupPage />
      </MemoryRouter>,
    );

    fireEvent.change(getByTestId("usernameInput"), { target: { value: "takenusername" } });
    fireEvent.blur(getByTestId("usernameInput"));

    fireEvent.change(getByTestId("emailInput"), { target: { value: "takenemail@domain.com" } });
    fireEvent.blur(getByTestId("emailInput"));

    const password = "password123";
    fireEvent.change(getByTestId("passwordInput"), { target: { value: password } });
    fireEvent.blur(getByTestId("passwordInput"));

    fireEvent.change(getByTestId("confirmPasswordInput"), { target: { value: password } });
    fireEvent.blur(getByTestId("confirmPasswordInput"));

    expect(getByTestId("signupButton")).not.toBeDisabled();

    // Mock out a failed signup response
    axiosMock.post.mockResolvedValueOnce(Promise.reject({ response: { data: { message: "signup error message" } } }));
    fireEvent.click(getByTestId("signupButton"));

    const signupError = await findByTestId("signupError");
    expect(signupError.innerHTML).toContain("signup error message");
  });
});
