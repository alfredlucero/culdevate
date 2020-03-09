import React from "react";
import { render } from "@testing-library/react";
import OtherLayout, { OtherLayoutProps } from "./index";

const defaultProps: OtherLayoutProps = {
  recaps: [
    {
      title: "Finished reading Clean Code book!",
      kind: "Other",
      userId: "userId",
      _id: "otherId",
      startDate: new Date("2017/10/20"),
      endDate: new Date("2017/12/20"),
      bulletPoints: ["Learned about how to write cleaner and more maintainable code", "Improved with code reviews"],
    },
  ],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<OtherLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <OtherLayout {...defaultProps} testId="otherLayoutTestId" className="extra-other-layout-class" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<OtherLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("otherRecap")).toBeNull();

    expect(getByTestId("otherEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<OtherLayout {...defaultProps} />);

    expect(queryByTestId("otherEmptyCard")).toBeNull();

    expect(getByTestId("otherRecap")).toBeVisible();
  });
});
