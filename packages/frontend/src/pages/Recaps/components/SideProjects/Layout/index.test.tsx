import React from "react";
import { render } from "@testing-library/react";
import SideProjectsLayout, { SideProjectsLayoutProps } from "./index";

const defaultProps: SideProjectsLayoutProps = {
  recaps: [
    {
      title: "Zeta Mu Beta Website",
      creators: "Alfred Lucero and Regine Deguzman",
      startDate: new Date("2016/11/01").toISOString(),
      endDate: new Date("2016/12/31").toISOString(),
      kind: "Side Projects",
      userId: "userId",
      _id: "sideProjectsId",
      bulletPoints: ["Created fraternity website on www.zetamubeta.org with MEAN stack"],
    },
  ],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<SideProjectsLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <SideProjectsLayout
        {...defaultProps}
        testId="sideProjectsLayoutTestId"
        className="extra-side-projects-layout-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<SideProjectsLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("sideProjectsRecap")).toBeNull();

    expect(getByTestId("sideProjectsEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<SideProjectsLayout {...defaultProps} />);

    expect(queryByTestId("sideProjectsEmptyCard")).toBeNull();

    expect(getByTestId("sideProjectsRecap")).toBeVisible();
  });
});
