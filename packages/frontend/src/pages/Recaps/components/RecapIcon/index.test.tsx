import React from "react";
import { render } from "@testing-library/react";
import RecapIcon from "./index";

describe("<RecapIcon />", () => {
  test("should render without error", () => {
    const { container } = render(<RecapIcon variant="work" />);

    expect(container).toMatchSnapshot();
  });
});
