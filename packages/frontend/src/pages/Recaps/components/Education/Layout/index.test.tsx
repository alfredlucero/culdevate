import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import EducationLayout, { EducationLayoutProps } from "./index";
import { RecapEducation, RecapKind } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";

const sampleRecapEducation: RecapEducation = {
  kind: RecapKind.Education,
  userId: "userId",
  _id: "educationId",
  bulletPoints: [
    "Upsilon Pi Epsilon Computer Science Honor Society",
    "Alpha Phi Sigma Honor Society",
    "Daily Bruin Web Development Intern",
  ],
  startDate: new Date("2013/10/01").toISOString(),
  endDate: new Date("2017/06/20").toISOString(),
  school: "University of California, Los Angeles",
  location: "Los Angeles, CA",
  degree: "Bachelor of Science",
  fieldOfStudy: "Computer Science",
  grade: "Alumnus",
};
const defaultProps: EducationLayoutProps = {
  recaps: [sampleRecapEducation],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<EducationLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <EducationLayout {...defaultProps} testId="educationLayoutTestId" className="extra-education-layout-class" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<EducationLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("educationRecap")).toBeNull();

    expect(getByTestId("educationEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<EducationLayout {...defaultProps} />);

    expect(queryByTestId("educationEmptyCard")).toBeNull();

    expect(getByTestId("educationRecap")).toBeVisible();
  });

  test("should show the success alert after deleting a recap successfully", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <EducationLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapEducation));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).toHaveBeenCalled();
    const successAlert = await findByText("You have successfully deleted the Education Recap!");
    expect(successAlert).toBeVisible();
  });

  test("should show the error alert after failing to delete a recap", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <EducationLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).not.toHaveBeenCalled();
    const errorAlert = await findByText("Something went wrong with deleting the Education Recap!", {
      exact: false,
    });
    expect(errorAlert).toBeVisible();
  });
});
