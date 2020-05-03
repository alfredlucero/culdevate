import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import SkillsLayout, { SkillsLayoutProps } from "./index";
import { RecapSkills, RecapKind } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";
import { RecapFields } from "../../../recaps.schema";

const sampleRecapSkills: RecapSkills = {
  title: "Tagalog",
  kind: RecapKind.Skills,
  userId: "userId",
  _id: "skillsId",
  proficiency: "Intermediate",
  bulletPoints: [
    "Not a fluent speaker but can understand every day Tagalog speaking well",
    "Can speak some Tagalog here and there but struggle with grammar",
  ],
};
const defaultProps: SkillsLayoutProps = {
  recaps: [sampleRecapSkills],
  onGoBackToLanding: () => {},
  onCreateRecapSuccess: () => {},
  onUpdateRecapSuccess: () => {},
  onDeleteRecapSuccess: () => {},
};

describe("<SkillsLayout />", () => {
  test("should render without error", () => {
    const { container } = render(
      <SkillsLayout {...defaultProps} testId="skillsLayoutTestId" className="extra-skills-layout-class" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show the empty state when there are no recaps", () => {
    const { getByTestId, queryByTestId } = render(<SkillsLayout {...defaultProps} recaps={[]} />);

    expect(queryByTestId("skillsRecap")).toBeNull();

    expect(getByTestId("skillsEmptyCard")).toBeVisible();
  });

  test("should show the recaps when there is data", () => {
    const { getByTestId, queryByTestId } = render(<SkillsLayout {...defaultProps} />);

    expect(queryByTestId("skillsEmptyCard")).toBeNull();

    expect(getByTestId("skillsRecap")).toBeVisible();
  });

  test("should show the success alert after deleting a recap successfully", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <SkillsLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapSkills));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).toHaveBeenCalled();
    const successAlert = await findByText("You have successfully deleted the Skills Recap!");
    expect(successAlert).toBeVisible();
  });

  test("should show the error alert after failing to delete a recap", async () => {
    const onDeleteRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText } = render(
      <SkillsLayout {...defaultProps} onDeleteRecapSuccess={onDeleteRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Delete"));

    expect(getByText("Are you sure you want to delete this?")).toBeVisible();

    jest.spyOn(RecapsService, "deleteRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByText("Confirm Delete"));

    await waitForElementToBeRemoved(() => queryByText("Are you sure you want to delete this?"));

    expect(onDeleteRecapSuccessMock).not.toHaveBeenCalled();
    const errorAlert = await findByText("Something went wrong with deleting the Skills Recap!", {
      exact: false,
    });
    expect(errorAlert).toBeVisible();
  });

  test("should show the success alert after creating a recap successfully", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId, queryByText } = render(
      <SkillsLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Skills Recap");
    expect(createModal).toBeVisible();

    const recap: RecapSkills = {
      title: "Tagalog",
      kind: RecapKind.Skills,
      userId: "userId",
      _id: "skillsId",
      proficiency: "Intermediate",
      bulletPoints: [],
    };

    fireEvent.change(getByLabelText(RecapFields.skillsTitle), { target: { value: recap.title } });
    fireEvent.blur(getByLabelText(RecapFields.skillsTitle));

    fireEvent.change(getByLabelText(RecapFields.skillsProficiency), { target: { value: recap.proficiency } });
    fireEvent.blur(getByLabelText(RecapFields.skillsProficiency));

    expect(getByTestId("skillsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.resolve(recap));

    fireEvent.click(getByTestId("skillsSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Create a Skills Recap"));

    expect(onCreateRecapSuccessMock).toHaveBeenCalled();
    expect(queryByText("You have successfully created a Skills Recap!")).toBeVisible();
  });

  test("should show the error alert after failing to create a recap", async () => {
    const onCreateRecapSuccessMock = jest.fn();
    const { getByText, findByText, getByLabelText, getByTestId } = render(
      <SkillsLayout {...defaultProps} onCreateRecapSuccess={onCreateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Add a Recap"));

    const createModal = await findByText("Create a Skills Recap");
    expect(createModal).toBeVisible();

    const recap: RecapSkills = {
      title: "Tagalog",
      kind: RecapKind.Skills,
      userId: "userId",
      _id: "skillsId",
      proficiency: "Intermediate",
      bulletPoints: [],
    };

    fireEvent.change(getByLabelText(RecapFields.skillsTitle), { target: { value: recap.title } });
    fireEvent.blur(getByLabelText(RecapFields.skillsTitle));

    fireEvent.change(getByLabelText(RecapFields.skillsProficiency), { target: { value: recap.proficiency } });
    fireEvent.blur(getByLabelText(RecapFields.skillsProficiency));

    expect(getByTestId("skillsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "createRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("skillsSaveButton"));

    const createErrorAlert = await findByText("Something went wrong with adding a Skills Recap!", {
      exact: false,
    });

    expect(createErrorAlert).toBeVisible();
    expect(getByText("Create a Skills Recap")).toBeVisible();
    expect(onCreateRecapSuccessMock).not.toHaveBeenCalled();
  });

  test("should show the success alert after updating a recap successfully", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <SkillsLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Skills Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("skillsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.resolve(sampleRecapSkills));

    fireEvent.click(getByTestId("skillsSaveButton"));

    await waitForElementToBeRemoved(() => queryByText("Edit your Skills Recap"));

    expect(queryByText("You have successfully updated a Skills Recap!")).toBeVisible();
    expect(onUpdateRecapSuccessMock).toHaveBeenCalled();
  });

  test("should show the error alert after failing to update a recap", async () => {
    const onUpdateRecapSuccessMock = jest.fn();
    const { getByText, queryByText, findByText, getByTestId } = render(
      <SkillsLayout {...defaultProps} onUpdateRecapSuccess={onUpdateRecapSuccessMock} />,
    );

    fireEvent.click(getByText("Edit"));

    const editModal = await findByText("Edit your Skills Recap");
    expect(editModal).toBeVisible();

    expect(getByTestId("skillsSaveButton")).not.toBeDisabled();

    jest.spyOn(RecapsService, "updateRecap").mockImplementationOnce(() => Promise.reject({}));

    fireEvent.click(getByTestId("skillsSaveButton"));

    const updateErrorAlert = await findByText("Something went wrong with updating a Skills Recap!", {
      exact: false,
    });
    expect(updateErrorAlert).toBeVisible();

    expect(queryByText("Edit your Skills Recap")).toBeVisible();
    expect(onUpdateRecapSuccessMock).not.toHaveBeenCalled();
  });
});
