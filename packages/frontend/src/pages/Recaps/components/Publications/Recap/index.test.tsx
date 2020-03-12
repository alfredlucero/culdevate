import React from "react";
import { render } from "@testing-library/react";
import { RecapPublications } from "../../../recaps.interface";
import PublicationsRecap from "./index";

const publications: RecapPublications = {
  title: "Mindfulness-based Interventions for those with PTSD",
  kind: "Publications",
  coauthors: "Gingin D.",
  userId: "userId",
  _id: "publicationsId",
  type: "Journal",
  bulletPoints: ["Providing meditation and cognitive behavioral therapy techniques for those with PTSD"],
  publisher: "UCI Psychology",
  startDate: new Date("2020/10/20"),
  url: "http://psychology.journal.com",
};

describe("<PublicationsRecap />", () => {
  const testId = "publicationsRecapTestId";

  test("should render without error", () => {
    const { container } = render(
      <PublicationsRecap
        publications={publications}
        onEdit={() => {}}
        onDelete={() => {}}
        testId={testId}
        className="extra-recap-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
