import React from "react";
import { render } from "@testing-library/react";
import PublicationsLayout, { PublicationsLayoutProps } from "./index";

const defaultProps: PublicationsLayoutProps = {
  recaps: [
    {
      title: "Mindfulness-based Interventions for those with PTSD",
      kind: "Publications",
      coauthors: "Gingin D.",
      userId: "userId",
      _id: "publicationsId",
      type: "Journal",
      bulletPoints: ["Providing meditation and cognitive behavioral therapy techniques for those with PTSD"],
      publisher: "UCI Psychology",
      startDate: new Date("2020/10/20").toISOString(),
      url: "http://psychology.journal.com",
    },
  ],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<PublicationsLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <PublicationsLayout
        {...defaultProps}
        testId="publicationsLayoutTestId"
        className="extra-publications-layout-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<PublicationsLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("publicationsRecap")).toBeNull();

    expect(getByTestId("publicationsEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<PublicationsLayout {...defaultProps} />);

    expect(queryByTestId("publicationsEmptyCard")).toBeNull();

    expect(getByTestId("publicationsRecap")).toBeVisible();
  });
});
