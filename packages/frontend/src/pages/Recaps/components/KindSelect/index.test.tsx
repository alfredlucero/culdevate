import React from "react";
import { render } from "@testing-library/react";
import KindSelect from "./index";

describe("<KindSelect />", () => {
  test("should render without error", () => {
    const { container } = render(
      <KindSelect
        id="kindSelect"
        value="Work Experience"
        onChange={() => {}}
        data-testid="Kind Select"
        className="extra-kind-select-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
