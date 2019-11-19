import React from "react";
import { render } from "@testing-library/react";
import Card from "./index";

describe("<Card />", () => {
  test("should render without error", () => {
    const { container } = render(
      <Card className="extra-card-class" testId="someCardTestId">
        <p>Children</p>
      </Card>,
    );

    expect(container).toMatchSnapshot();
  });
});
