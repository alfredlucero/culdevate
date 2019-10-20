import React from "react";
import { render } from "@testing-library/react";
import LandingPage from "./index";

describe("<LandingPage />", () => {
  test("should render without error", () => {
    const { getByTestId } = render(<LandingPage />);
    expect(getByTestId("landingPage")).toBeVisible();
  });
});
