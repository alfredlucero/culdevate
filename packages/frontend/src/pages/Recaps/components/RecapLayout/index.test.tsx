import React from "react";
import { render } from "@testing-library/react";
import * as RecapLayout from "./index";

describe("<RecapLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <RecapLayout.Container className="extra-class" testId="testId">
        <RecapLayout.Header className="extra-class" testId="testId" onClickBack={() => {}}>
          <RecapLayout.HeaderTitle className="extra-class" testId="testId" onClickAdd={() => {}}>
            Work Experience
          </RecapLayout.HeaderTitle>
          <RecapLayout.HeaderDescription className="extra-class" testId="testId">
            Work Experience description comes over here!
          </RecapLayout.HeaderDescription>
        </RecapLayout.Header>
        <RecapLayout.Content className="extra-class" testId="testId">
          Inner Content
        </RecapLayout.Content>
      </RecapLayout.Container>,
    );

    expect(container).toMatchSnapshot();
  });
});
