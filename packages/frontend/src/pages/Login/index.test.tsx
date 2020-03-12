import React from "react";
import { MemoryRouter, Switch, Route } from "react-router-dom";
import { render, fireEvent } from "@testing-library/react";
import axios from "axios";
import LoginPage from "./index";
import { usernameErrors, passwordErrors } from "../../auth/auth.schema";

jest.mock("axios");
const axiosMock = axios as jest.Mocked<typeof axios>;

describe("<LoginPage />", () => {
  test("should render without error", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );
    expect(getByTestId("loginPage")).toBeVisible();
  });

  test("should redirect to signup route when clicking create account link", () => {
    const { getByTestId, container } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <div>Sign Up Page</div>
          </Route>
        </Switch>
      </MemoryRouter>,
    );

    fireEvent.click(getByTestId("createAccountLink"));

    expect(container.innerHTML).toContain("Sign Up Page");
  });

  test("should show inline error and disabled login button for invalid username", async () => {
    const { getByTestId, findByText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    fireEvent.change(getByTestId("usernameInput"), { target: { value: "ab" } });
    fireEvent.blur(getByTestId("usernameInput"));

    const usernameError = await findByText(usernameErrors.lessThanMin);

    expect(usernameError).toBeVisible();
    expect(getByTestId("loginButton")).toBeDisabled();
  });

  test("should show inline error and disabled login button for invalid password", async () => {
    const { getByTestId, findByText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    fireEvent.change(getByTestId("passwordInput"), { target: { value: "2short" } });
    fireEvent.blur(getByTestId("passwordInput"));

    const passwordError = await findByText(passwordErrors.lessThanMin);

    expect(passwordError).toBeVisible();
    expect(getByTestId("loginButton")).toBeDisabled();
  });

  test("should show inline errors and disabled login button for invalid username and password", async () => {
    const { getByTestId, findByText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    fireEvent.change(getByTestId("usernameInput"), { target: { value: "ab" } });
    fireEvent.blur(getByTestId("usernameInput"));

    const usernameError = await findByText(usernameErrors.lessThanMin);

    expect(usernameError).toBeVisible();
    expect(getByTestId("loginButton")).toBeDisabled();

    fireEvent.change(getByTestId("passwordInput"), { target: { value: "2short" } });
    fireEvent.blur(getByTestId("passwordInput"));

    const passwordError = await findByText(passwordErrors.lessThanMin);

    expect(passwordError).toBeVisible();
    expect(getByTestId("loginButton")).toBeDisabled();
  });

  test("should redirect to authenticated page after submitting valid, matching credentials", async () => {
    const { getByTestId, findByText } = render(
      <MemoryRouter initialEntries={["/login"]}>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/recaps">
            <div>Recaps</div>
          </Route>
        </Switch>
      </MemoryRouter>,
    );

    fireEvent.change(getByTestId("usernameInput"), { target: { value: "matchingusername" } });
    fireEvent.blur(getByTestId("usernameInput"));

    fireEvent.change(getByTestId("passwordInput"), { target: { value: "matchingpassword" } });
    fireEvent.blur(getByTestId("passwordInput"));

    // Mock out a successful login response
    axiosMock.post.mockResolvedValueOnce(Promise.resolve({ data: { token: "culdevate_auth_token" } }));
    fireEvent.click(getByTestId("loginButton"));

    const recapsPage = await findByText("Recaps");
    expect(recapsPage).toBeVisible();
  });

  test("should show login error after failing to log in", async () => {
    const { getByTestId, findByTestId } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>,
    );

    fireEvent.change(getByTestId("usernameInput"), { target: { value: "matchingusername" } });
    fireEvent.blur(getByTestId("usernameInput"));

    fireEvent.change(getByTestId("passwordInput"), { target: { value: "matchingpassword" } });
    fireEvent.blur(getByTestId("passwordInput"));

    // Mock out a failed login response
    axiosMock.post.mockResolvedValueOnce(Promise.reject({ response: { data: { message: "login error message" } } }));
    fireEvent.click(getByTestId("loginButton"));

    const loginError = await findByTestId("loginError");
    expect(loginError.innerHTML).toContain("login error message");
  });
});
