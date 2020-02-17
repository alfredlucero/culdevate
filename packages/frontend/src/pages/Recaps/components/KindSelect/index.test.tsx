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
        testId="kind-select-id"
        className="extra-kind-select-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
