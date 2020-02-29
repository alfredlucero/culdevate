import React from "react";
import { render } from "@testing-library/react";
import * as RecapListCard from "./index";

describe("<RecapListCard />", () => {
  test("should render composable pieces without error", () => {
    const { container } = render(
      <RecapListCard.ListCard className="extra-listcard-class" testId="listCardTestId">
        <RecapListCard.Icon kind="Work Experience" className="extra-icon-class" testId="iconTestId" />
        <RecapListCard.Kind kind="Work Experience" className="extra-kind-class" testId="kindTestId" />
        <RecapListCard.Actions
          onClickAdd={() => {}}
          onClickView={() => {}}
          className="extra-actions-class"
          testId="actionsTestId"
        />
        <RecapListCard.Count count={10} className="extra-count-class" testId="countTestId" />
      </RecapListCard.ListCard>,
    );

    expect(container).toMatchSnapshot();
  });
});
