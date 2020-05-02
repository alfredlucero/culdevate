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

  test("should show the success alert after creating a recap successfully", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId, queryByText } = render(
      <EducationLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Education Recap");
    expect(createModal).toBeVisible();

    const recap: RecapEducation = {
      kind: RecapKind.Education,
      userId: "userId",
      _id: "educationId",
      bulletPoints: [],
      startDate: new Date("2020/01/01").toISOString(),
      endDate: new Date("2020/10/01").toISOString(),
      school: "School",
      location: "Location",
      degree: "Degree",
      fieldOfStudy: "Field of Study",
      grade: "Grade",
    };

    fireEvent.change(getByLabelText("School"), { target: { value: recap.school } });
    fireEvent.blur(getByLabelText("School"));

    fireEvent.change(getByLabelText("Location"), { target: { value: recap.location } });
    fireEvent.blur(getByLabelText("Location"));

    fireEvent.change(getByLabelText("Degree/Certification"), { target: { value: recap.degree } });
    fireEvent.blur(getByLabelText("Degree/Certification"));

    fireEvent.change(getByLabelText("Field of Study/Major"), { target: { value: recap.fieldOfStudy } });
    fireEvent.blur(getByLabelText("Field of Study/Major"));

    fireEvent.change(getByLabelText("Grade"), { target: { value: recap.grade } });
    fireEvent.blur(getByLabelText("Grade"));

    fireEvent.change(getByLabelText("Start Date"), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText("Start Date"));

    fireEvent.change(getByLabelText("End Date"), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText("End Date"));

    expect(getByTestId("educationSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.resolve(recap));

    fireEvent.click(getByTestId("educationSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Create a Education Recap"));

    expect(onCreateRecapSuccessMock).toHaveBeenCalled();
    expect(queryByText("You have successfully created a Education Recap!")).toBeVisible();
  });

  test("should show the error alert after failing to create a recap", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId, queryByText } = render(
      <EducationLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Education Recap");
    expect(createModal).toBeVisible();

    const recap: RecapEducation = {
      kind: RecapKind.Education,
      userId: "userId",
      _id: "educationId",
      bulletPoints: [],
      startDate: new Date("2020/01/01").toISOString(),
      endDate: new Date("2020/10/01").toISOString(),
      school: "School",
      location: "Location",
      degree: "Degree",
      fieldOfStudy: "Field of Study",
      grade: "Grade",
    };

    fireEvent.change(getByLabelText("School"), { target: { value: recap.school } });
    fireEvent.blur(getByLabelText("School"));

    fireEvent.change(getByLabelText("Location"), { target: { value: recap.location } });
    fireEvent.blur(getByLabelText("Location"));

    fireEvent.change(getByLabelText("Degree/Certification"), { target: { value: recap.degree } });
    fireEvent.blur(getByLabelText("Degree/Certification"));

    fireEvent.change(getByLabelText("Field of Study/Major"), { target: { value: recap.fieldOfStudy } });
    fireEvent.blur(getByLabelText("Field of Study/Major"));

    fireEvent.change(getByLabelText("Grade"), { target: { value: recap.grade } });
    fireEvent.blur(getByLabelText("Grade"));

    fireEvent.change(getByLabelText("Start Date"), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText("Start Date"));

    fireEvent.change(getByLabelText("End Date"), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText("End Date"));

    expect(getByTestId("educationSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("educationSaveButton"));

    const createErrorAlert = await findByText("Something went wrong with adding a Education Recap!", {
      exact: false,
    });

    expect(createErrorAlert).toBeVisible();
    expect(getByText("Create a Education Recap")).toBeVisible();
    expect(onCreateRecapSuccessMock).not.toHaveBeenCalled();
  });

  test("should show the success alert after updating a recap successfully", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <EducationLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Education Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("educationSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapEducation));

    fireEvent.click(getByTestId("educationSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Edit your Education Recap"));

    expect(queryByText("You have successfully updated a Education Recap!")).toBeVisible();
    expect(onUpdateRecapSuccessMock).toHaveBeenCalled();
  });

  test("should show the error alert after failing to update a recap", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <EducationLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Education Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("educationSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("educationSaveButton"));

    const updateErrorAlert = await findByText("Something went wrong with updating a Education Recap!", {
      exact: false,
    });
    expect(updateErrorAlert).toBeVisible();

    expect(queryByText("Edit your Education Recap")).toBeVisible();
    expect(onUpdateRecapSuccessMock).not.toHaveBeenCalled();
  });
});
