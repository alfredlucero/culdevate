import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import WorkExperienceLayout, { WorkExperienceLayoutProps } from "./index";
import { RecapWorkExperience, RecapKind } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";

const sampleRecapWorkExperience: RecapWorkExperience = {
  kind: RecapKind.WorkExperience,
  userId: "userId",
  _id: "workExperienceId",
  bulletPoints: [
    "Worked on the Culdevate start up seriously",
    "Getting better at making REST API endpoints",
    "Improving interviewing and mentoring skills",
  ],
  startDate: new Date("2020/01/17").toISOString(),
  title: "Lead Software Engineer",
  company: "Culdevate",
  location: "Long Beach, CA",
  employmentType: "Self-Employed",
};

const defaultProps: WorkExperienceLayoutProps = {
  recaps: [sampleRecapWorkExperience],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<WorkExperienceLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <WorkExperienceLayout
        {...defaultProps}
        testId="workExperienceLayoutTestId"
        className="extra-work-experience-layout-class"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<WorkExperienceLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("workExperienceRecap")).toBeNull();

    expect(getByTestId("workExperienceEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<WorkExperienceLayout {...defaultProps} />);

    expect(queryByTestId("workExperienceEmptyCard")).toBeNull();

    expect(getByTestId("workExperienceRecap")).toBeVisible();
  });

  test("should show the success alert after deleting a recap successfully", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <WorkExperienceLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapWorkExperience));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).toHaveBeenCalled();
    const successAlert = await findByText("You have successfully deleted the Work Experience Recap!");
    expect(successAlert).toBeVisible();
  });

  test("should show the error alert after failing to delete a recap", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <WorkExperienceLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).not.toHaveBeenCalled();
    const errorAlert = await findByText("Something went wrong with deleting the Work Experience Recap!", {
      exact: false,
    });
    expect(errorAlert).toBeVisible();
  });
});
