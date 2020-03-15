import React from "react";
import { render } from "@testing-library/react";
import { RecapSideProjects } from "../../../recaps.interface";
import SideProjectsRecap from "./index";

const sideProjects: RecapSideProjects = {
  title: "Zeta Mu Beta Website",
  creators: "Alfred Lucero and Regine Deguzman",
  startDate: new Date("2016/11/01").toISOString(),
  endDate: new Date("2016/12/31").toISOString(),
  kind: "Side Projects",
  userId: "userId",
  _id: "sideProjectsId",
  bulletPoints: ["Created fraternity website on www.zetamubeta.org with MEAN stack"],
};

describe("<SideProjectsRecap />", () => {
  const testId = "sideProjectsRecapTestId";

  test("should render without error", () => {
    const { container } = render(
      <SideProjectsRecap
        sideProjects={sideProjects}
        onEdit={() => {}}
        onDelete={() => {}}
        testId={testId}
        className="extra-recap-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show date range to the present if there is no end date", () => {
    const { getByTestId } = render(
      <SideProjectsRecap
        sideProjects={{
          _id: sideProjects._id,
          userId: sideProjects.userId,
          startDate: sideProjects.startDate,
          title: sideProjects.title,
          creators: sideProjects.creators,
          kind: sideProjects.kind,
          bulletPoints: sideProjects.bulletPoints,
        }}
        onEdit={() => {}}
        onDelete={() => {}}
        testId={testId}
      />,
    );

    expect(getByTestId(testId).textContent).toContain("Present");
  });
});
