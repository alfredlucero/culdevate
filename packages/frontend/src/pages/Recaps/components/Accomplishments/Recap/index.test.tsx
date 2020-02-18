import React from "react";
import { render } from "@testing-library/react";
import { RecapAccomplishments } from "../../../../../interfaces/recaps.interface";
import AccomplishmentsRecap from "./index";

const accomplishments: RecapAccomplishments = {
  title: "Promoted to Software Engineer 2 at SendGrid",
  kind: "Accomplishments",
  userId: "userId",
  _id: "accomplishmentsId",
  type: "Career",
  bulletPoints: [
    "Led migration of manual frontend deployments and hosting on on-prem nginx servers to AWS S3 and CloudFront with Terraform and Buildkite for CICD",
    "Contributed to the development and pushed the final release of the redesigned Email Activity in Backbone/Marionette",
    "Led the transition from an in-house Ruby Selenium solution to WebdriverIO and finally to Cypress for E2E tests",
  ],
  startDate: new Date("2018/10/20"),
};

describe("<AccomplishmentsRecap />", () => {
  const testId = "accomplishmentsRecapTestId";

  test("should render without error", () => {
    const { container } = render(
      <AccomplishmentsRecap
        accomplishments={accomplishments}
        onEdit={() => {}}
        onDelete={() => {}}
        testId={testId}
        className="extra-recap-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
