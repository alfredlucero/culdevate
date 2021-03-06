import React from "react";
import { render } from "@testing-library/react";
import * as RecapEmptyCard from "./index";
import { RecapKind } from "../../recaps.interface";

describe("<RecapEmptyCard />", () => {
  test("should render composable pieces without error", () => {
    const { container } = render(
      <RecapEmptyCard.EmptyCard className="extra-emptycard-class" testId="emptyCardTestId">
        <RecapEmptyCard.Icon kind={RecapKind.WorkExperience} className="extra-icon-class" testId="iconTestId" />
        <RecapEmptyCard.Kind kind={RecapKind.WorkExperience} className="extra-kind-class" testId="kindTestId" />
        <RecapEmptyCard.Description className="extra-description-class" testId="descriptionTestId">
          Recap everything about your career from internships to full-time jobs and opportunities.
        </RecapEmptyCard.Description>
        <RecapEmptyCard.Actions onClickAdd={() => {}} className="extra-actions-class" testId="actionsTestId" />
      </RecapEmptyCard.EmptyCard>,
    );

    expect(container).toMatchSnapshot();
  });
});
