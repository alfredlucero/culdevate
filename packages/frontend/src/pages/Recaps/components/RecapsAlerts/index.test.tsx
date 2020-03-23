import React from "react";
import { render } from "@testing-library/react";
import RecapsCreateSuccessAlert from "./RecapsCreateSuccessAlert";
import RecapsCreateErrorAlert from "./RecapsCreateErrorAlert";
import RecapsUpdateSuccessAlert from "./RecapsUpdateSuccessAlert";
import RecapsUpdateErrorAlert from "./RecapsUpdateErrorAlert";
import RecapsDeleteSuccessAlert from "./RecapsDeleteSuccessAlert";
import RecapsDeleteErrorAlert from "./RecapsDeleteErrorAlert";

describe("<RecapAlerts />", () => {
  test("should render all alerts without error", () => {
    const { container } = render(
      <div>
        <RecapsCreateSuccessAlert
          kind="Education"
          isShowing={true}
          onHide={() => {}}
          className="extra-class"
          testId="testId"
        />
        <RecapsCreateErrorAlert
          kind="Education"
          isShowing={true}
          onHide={() => {}}
          className="extra-class"
          testId="testId"
        />
        <RecapsDeleteSuccessAlert
          kind="Education"
          isShowing={true}
          onHide={() => {}}
          className="extra-class"
          testId="testId"
        />
        <RecapsDeleteErrorAlert
          kind="Education"
          isShowing={true}
          onHide={() => {}}
          className="extra-class"
          testId="testId"
        />
        <RecapsUpdateSuccessAlert
          kind="Education"
          isShowing={true}
          onHide={() => {}}
          className="extra-class"
          testId="testId"
        />
        <RecapsUpdateErrorAlert
          kind="Education"
          isShowing={true}
          onHide={() => {}}
          className="extra-class"
          testId="testId"
        />
      </div>,
    );
  });
});
