import React from "react";
import { render, cleanup } from "react-testing-library";
import Button, { ButtonKind, ButtonSize, ButtonType } from "./index";

const requiredButtonProps = {
  onClick: () => {},
  kind: "primary" as ButtonKind,
  type: "button" as ButtonType,
  size: "small" as ButtonSize,
};

afterEach(cleanup);

describe("<Button />", () => {
  test("should render Button component", () => {
    const { container } = render(<Button {...requiredButtonProps}>Primary</Button>);

    expect(container.firstChild).toMatchSnapshot();
  });
});
