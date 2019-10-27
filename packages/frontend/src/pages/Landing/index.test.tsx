import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render } from "@testing-library/react";
import LandingPage from "./index";

describe("<LandingPage />", () => {
  test("should render without error", () => {
    const { getByTestId } = render(
      <Router>
        <LandingPage />
      </Router>,
    );
    expect(getByTestId("landingPage")).toBeVisible();
  });
});
