import React from "react";
import { render, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import SkillsLayout, { SkillsLayoutProps } from "./index";
import { RecapSkills, RecapKind } from "../../../recaps.interface";
import * as RecapsService from "../../../recaps.service";

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
});
