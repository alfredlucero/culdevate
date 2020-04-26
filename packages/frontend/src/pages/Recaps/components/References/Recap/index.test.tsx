import React from "react";
import { render } from "@testing-library/react";
import { RecapReferences, RecapKind } from "../../../recaps.interface";
import ReferencesRecap from "./index";

const references: RecapReferences = {
  title: "Andrew C. - Product Manager",
  kind: RecapKind.References,
  userId: "userId",
  _id: "referencesId",
  company: "Sandia National Laboratories",
  bulletPoints: [
    "Worked under Andrew in building a Node.js, MongoDB, Neo4J bitcoin transaction visualization and classification prototype with D3.js sankey flows",
    "Mentored by Ethan C. and worked with Steven R. in building out the frontend and parts of the backend",
  ],
  phoneNumber: "555-555-5555",
  email: "ac@sandia.gov",
};

describe("<ReferencesRecap />", () => {
  const testId = "referencesRecapTestId";

  test("should render without error", () => {
    const { container } = render(
      <ReferencesRecap
        references={references}
        onEdit={() => {}}
        onDelete={() => {}}
        testId={testId}
        className="extra-recap-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
