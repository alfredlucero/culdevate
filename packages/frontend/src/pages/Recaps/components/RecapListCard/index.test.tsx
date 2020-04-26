import React from "react";
import { render } from "@testing-library/react";
import * as RecapListCard from "./index";
import { RecapKind } from "../../recaps.interface";

describe("<RecapListCard />", () => {
  test("should render composable pieces without error", () => {
    const { container } = render(
      <RecapListCard.ListCard onClick={() => {}} className="extra-listcard-class" testId="listCardTestId">
        <RecapListCard.Icon kind={RecapKind.WorkExperience} className="extra-icon-class" testId="iconTestId" />
        <RecapListCard.Kind kind={RecapKind.WorkExperience} className="extra-kind-class" testId="kindTestId" />
      </RecapListCard.ListCard>,
    );

    expect(container).toMatchSnapshot();
  });
});
