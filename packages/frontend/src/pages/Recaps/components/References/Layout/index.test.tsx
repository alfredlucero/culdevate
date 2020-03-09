import React from "react";
import { render } from "@testing-library/react";
import ReferencesLayout, { ReferencesLayoutProps } from "./index";

const defaultProps: ReferencesLayoutProps = {
  recaps: [
    {
      title: "Andrew C. - Product Manager",
      kind: "References",
      userId: "userId",
      _id: "referencesId",
      company: "Sandia National Laboratories",
      bulletPoints: [
        "Worked under Andrew in building a Node.js, MongoDB, Neo4J bitcoin transaction visualization and classification prototype with D3.js sankey flows",
        "Mentored by Ethan C. and worked with Steven R. in building out the frontend and parts of the backend",
      ],
      phoneNumber: "555-555-5555",
      email: "ac@sandia.gov",
    },
  ],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<ReferencesLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <ReferencesLayout {...defaultProps} testId="referencesLayoutTestId" className="extra-references-layout-class" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<ReferencesLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("referencesRecap")).toBeNull();

    expect(getByTestId("referencesEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<ReferencesLayout {...defaultProps} />);

    expect(queryByTestId("referencesEmptyCard")).toBeNull();

    expect(getByTestId("referencesRecap")).toBeVisible();
  });
});
