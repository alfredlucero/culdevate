import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavigationAuth from "./index";

describe("<NavigationAuth />", () => {
  test("should render without error", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <NavigationAuth onLogOut={() => {}} username="culdevate" />
      </MemoryRouter>,
    );

    expect(getByTestId("navigationAuth")).toBeVisible();
    expect(getByTestId("profileAuthLink").innerHTML).toContain("culdevate");
  });

  test("should call onLogOut when clicking logout button", () => {
    const onLogOutMock = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <NavigationAuth onLogOut={onLogOutMock} username="culdevate" />
      </MemoryRouter>,
    );

    fireEvent.click(getByTestId("logOutButton"));

    expect(onLogOutMock).toHaveBeenCalled();
  });

  test("should show the correct auth route as active when first rendering the navigation", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <NavigationAuth onLogOut={() => {}} username="culdevate" />
      </MemoryRouter>,
    );

    expect(getByTestId("dashboardAuthLink")).toHaveAttribute("data-active", "true");
  });

  test("should show the impacts route as active when clicking the impacts route", () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/recaps"]}>
        <NavigationAuth onLogOut={() => {}} username="alfienity" />
      </MemoryRouter>,
    );

    expect(getByTestId("recapsAuthLink")).toHaveAttribute("data-active", "true");

    fireEvent.click(getByTestId("impactsAuthLink"));

    expect(getByTestId("recapsAuthLink")).toHaveAttribute("data-active", "false");
    expect(getByTestId("impactsAuthLink")).toHaveAttribute("data-active", "true");
  });
});
