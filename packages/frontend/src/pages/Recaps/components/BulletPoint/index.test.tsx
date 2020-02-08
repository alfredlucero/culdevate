import React from "react";
import { render } from "@testing-library/react";
import BulletPoint from "./index";

describe("<BulletPoint />", () => {
  const bulletPointTestId = "bulletPointTestId";

  test("should render without error", () => {
    const { container } = render(
      <BulletPoint bulletPoint="Some bullet point!" testId={bulletPointTestId} className="extra-bulletpoint-class" />,
    );

    expect(container).toMatchSnapshot();
  });
});
