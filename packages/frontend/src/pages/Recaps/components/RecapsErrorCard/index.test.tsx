import React from "react";
import { render } from "@testing-library/react";
import RecapsErrorCard from "./index";

describe("<RecapErrorCard />", () => {
  test("should render without error", () => {
    const { container } = render(
      <RecapsErrorCard onRetry={() => {}} testId="recapsErrorCardTestId" className="extra-recaps-error-card-class" />,
    );

    expect(container).toMatchSnapshot();
  });
});
