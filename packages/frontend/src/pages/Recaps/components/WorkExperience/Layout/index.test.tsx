import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import WorkExperienceLayout, { WorkExperienceLayoutProps } from "./index";
import { RecapWorkExperience, RecapKind } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

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

  test("should show the success alert after creating a recap successfully", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId, queryByText } = render(
      <WorkExperienceLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Work Experience Recap");
    expect(createModal).toBeVisible();

    const recap: RecapWorkExperience = {
      kind: RecapKind.WorkExperience,
      userId: "userId",
      _id: "workExperienceId",
      bulletPoints: [],
      startDate: new Date("2020/01/01").toISOString(),
      endDate: new Date("2020/10/01").toISOString(),
      title: "workTitle",
      company: "workCompany",
      location: "workLocation",
      employmentType: "Self-Employed",
    };

    fireEvent.change(getByLabelText(RecapFields.workTitle), { target: { value: recap.title } });
    fireEvent.blur(getByLabelText(RecapFields.workTitle));

    fireEvent.change(getByLabelText(RecapFields.workCompany), { target: { value: recap.company } });
    fireEvent.blur(getByLabelText(RecapFields.workCompany));

    fireEvent.change(getByLabelText(RecapFields.workLocation), { target: { value: recap.location } });
    fireEvent.blur(getByLabelText(RecapFields.workLocation));

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    expect(getByTestId("workExperienceSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.resolve(recap));

    fireEvent.click(getByTestId("workExperienceSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Create a Work Experience Recap"));

    expect(onCreateRecapSuccessMock).toHaveBeenCalled();
    expect(queryByText("You have successfully created a Work Experience Recap!")).toBeVisible();
  });

  test("should show the error alert after failing to create a recap", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId } = render(
      <WorkExperienceLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Work Experience Recap");
    expect(createModal).toBeVisible();

    const recap: RecapWorkExperience = {
      kind: RecapKind.WorkExperience,
      userId: "userId",
      _id: "workExperienceId",
      bulletPoints: [],
      startDate: new Date("2020/01/01").toISOString(),
      endDate: new Date("2020/10/01").toISOString(),
      title: "workTitle",
      company: "workCompany",
      location: "workLocation",
      employmentType: "Self-Employed",
    };

    fireEvent.change(getByLabelText(RecapFields.workTitle), { target: { value: recap.title } });
    fireEvent.blur(getByLabelText(RecapFields.workTitle));

    fireEvent.change(getByLabelText(RecapFields.workCompany), { target: { value: recap.company } });
    fireEvent.blur(getByLabelText(RecapFields.workCompany));

    fireEvent.change(getByLabelText(RecapFields.workLocation), { target: { value: recap.location } });
    fireEvent.blur(getByLabelText(RecapFields.workLocation));

    fireEvent.change(getByLabelText(RecapFields.startDate), { target: { value: "01/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.startDate));

    fireEvent.change(getByLabelText(RecapFields.endDate), { target: { value: "10/2020" } });
    fireEvent.blur(getByLabelText(RecapFields.endDate));

    expect(getByTestId("workExperienceSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("workExperienceSaveButton"));

    const createErrorAlert = await findByText("Something went wrong with adding a Work Experience Recap!", {
      exact: false,
    });

    expect(createErrorAlert).toBeVisible();
    expect(getByText("Create a Work Experience Recap")).toBeVisible();
    expect(onCreateRecapSuccessMock).not.toHaveBeenCalled();
  });

  test("should show the success alert after updating a recap successfully", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <WorkExperienceLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Work Experience Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("workExperienceSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapWorkExperience));

    fireEvent.click(getByTestId("workExperienceSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Edit your Work Experience Recap"));

    expect(queryByText("You have successfully updated a Work Experience Recap!")).toBeVisible();
    expect(onUpdateRecapSuccessMock).toHaveBeenCalled();
  });

  test("should show the error alert after failing to update a recap", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <WorkExperienceLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Work Experience Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("workExperienceSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("workExperienceSaveButton"));

    const updateErrorAlert = await findByText("Something went wrong with updating a Work Experience Recap!", {
      exact: false,
    });
    expect(updateErrorAlert).toBeVisible();

    expect(queryByText("Edit your Work Experience Recap")).toBeVisible();
    expect(onUpdateRecapSuccessMock).not.toHaveBeenCalled();
  });
});
