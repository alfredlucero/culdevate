import React from "react";
import { render } from "@testing-library/react";
import RecapsCreateSuccessAlert from "./RecapsCreateSuccessAlert";
import RecapsCreateErrorAlert from "./RecapsCreateErrorAlert";
import RecapsUpdateSuccessAlert from "./RecapsUpdateSuccessAlert";
import RecapsUpdateErrorAlert from "./RecapsUpdateErrorAlert";
import RecapsDeleteSuccessAlert from "./RecapsDeleteSuccessAlert";
import RecapsDeleteErrorAlert from "./RecapsDeleteErrorAlert";
import { RecapKind } from "../../recaps.interface";

describe("<RecapAlerts />", () => {
  test("should render all alerts without error", () => {
    const { container } = render(
      <div>
        <RecapsCreateSuccessAlert
          kind={RecapKind.Education}
          isShowing={true}
          onHide={() => {}}
          className="extra-class"
          testId="testId"
        />
        <RecapsCreateErrorAlert
          kind={RecapKind.Education}
          isShowing={true}
          onHide={() => {}}
          className="extra-class"
          testId="testId"
        />
        <RecapsDeleteSuccessAlert
          kind={RecapKind.Education}
          isShowing={true}
          onHide={() => {}}
          className="extra-class"
          testId="testId"
        />
        <RecapsDeleteErrorAlert
          kind={RecapKind.Education}
          isShowing={true}
          onHide={() => {}}
          className="extra-class"
          testId="testId"
        />
        <RecapsUpdateSuccessAlert
          kind={RecapKind.Education}
          isShowing={true}
          onHide={() => {}}
          className="extra-class"
          testId="testId"
        />
        <RecapsUpdateErrorAlert
          kind={RecapKind.Education}
          isShowing={true}
          onHide={() => {}}
          className="extra-class"
          testId="testId"
        />
      </div>,
    );

    expect(container).toMatchSnapshot();
  });
});
