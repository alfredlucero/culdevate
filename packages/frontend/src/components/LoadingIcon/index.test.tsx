import React from "react";
import { render } from "@testing-library/react";
import LoadingIcon from "./index";

describe("<LoadingIcon />", () => {
  test("should render without error", () => {
    const { container } = render(<LoadingIcon size="medium" className="loading-class" testId="loadingIconId" />);

    expect(container).toMatchSnapshot();
  });
});
