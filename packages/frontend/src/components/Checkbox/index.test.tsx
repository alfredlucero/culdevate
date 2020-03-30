import React from "react";
import { render } from "@testing-library/react";
import Checkbox from "./index";

describe("<Checkbox />", () => {
  test("should render without error", () => {
    const { container } = render(
      <Checkbox
        onChange={() => {}}
        id="checkboxId"
        checked={false}
        label="Checkbox Label"
        testId="checkboxTestId"
        className="extra-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
