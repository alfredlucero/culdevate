import React from "react";
import { render, cleanup } from "react-testing-library";
import Button from "./index";

afterEach(cleanup);

describe("Button", () => {
  test("should be true", () => {
    const { getByTestId } = render(<Button testId="testButton" />);

    expect(getByTestId("testButton")).toBeTruthy();
  });
});
