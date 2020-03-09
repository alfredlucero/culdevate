import React from "react";
import { render } from "@testing-library/react";
import AccomplishmentsLayout, { AccomplishmentsLayoutProps } from "./index";

const defaultProps: AccomplishmentsLayoutProps = {
  recaps: [
    {
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
    },
  ],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<AccomplishmentsLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <AccomplishmentsLayout
        {...defaultProps}
        testId="accomplishmentsLayoutTestId"
        className="extra-accomplishments-layout-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<AccomplishmentsLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("accomplishmentsRecap")).toBeNull();

    expect(getByTestId("accomplishmentsEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<AccomplishmentsLayout {...defaultProps} />);

    expect(queryByTestId("accomplishmentsEmptyCard")).toBeNull();

    expect(getByTestId("accomplishmentsRecap")).toBeVisible();
  });
});
