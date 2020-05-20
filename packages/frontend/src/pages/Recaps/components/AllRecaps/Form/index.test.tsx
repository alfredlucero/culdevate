import React from "react";
import { render } from "@testing-library/react";
import AllRecapsForm, { AllRecapsFormProps } from "./index";
import { RecapSkills, RecapKind } from "../../../recaps.interface";
import { RecapFields } from "../../../recaps.schema";

const initialRecap: RecapSkills = {
  title: "Tagalog",
  kind: RecapKind.Skills,
  userId: "userId",
  _id: "skillsId",
  proficiency: "Intermediate",
  bulletPoints: [],
};
const defaultProps: AllRecapsFormProps = {
  initialRecap,
  onSaveSuccess: () => {},
  isShowing: true,
  onHide: () => {},
  selectedKind: RecapKind.Skills,
};

describe("<AllRecapsForm />", () => {
  test("should show empty form inputs and disabled state given no initial recap", () => {
    const { container } = render(
      <AllRecapsForm {...defaultProps} initialRecap={null} testId="allRecapsFormTestId" className="extra-class-name" />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should render pre-populated form inputs given initial recap", () => {
    const { container } = render(
      <AllRecapsForm
        {...defaultProps}
        initialRecap={initialRecap}
        testId="allRecapsFormTestId"
        className="extra-class-name"
      />,
    );

    expect(container).toMatchSnapshot();
  });

  test("should show work experience form given work experience is selected", () => {
    const { getByLabelText } = render(
      <AllRecapsForm {...defaultProps} selectedKind={RecapKind.WorkExperience} initialRecap={null} />,
    );

    expect(getByLabelText(RecapFields.workTitle)).toBeVisible();
  });

  test("should show education form given education is selected", () => {
    const { getByLabelText } = render(
      <AllRecapsForm {...defaultProps} selectedKind={RecapKind.Education} initialRecap={null} />,
    );

    expect(getByLabelText(RecapFields.educationSchool)).toBeVisible();
  });

  test("should show accomplishments form given accomplishments is selected", () => {
    const { getByLabelText } = render(
      <AllRecapsForm {...defaultProps} selectedKind={RecapKind.Accomplishments} initialRecap={null} />,
    );

    expect(getByLabelText(RecapFields.accomplishmentsTitle)).toBeVisible();
  });

  test("should show organizations form given organizations is selected", () => {
    const { getByLabelText } = render(
      <AllRecapsForm {...defaultProps} selectedKind={RecapKind.Organizations} initialRecap={null} />,
    );

    expect(getByLabelText(RecapFields.organizationsName)).toBeVisible();
  });

  test("should show skills form given skills is selected", () => {
    const { getByLabelText } = render(
      <AllRecapsForm {...defaultProps} selectedKind={RecapKind.Skills} initialRecap={null} />,
    );

    expect(getByLabelText(RecapFields.skillsTitle)).toBeVisible();
  });

  test("should show side projects form given side projects is selected", () => {
    const { getByLabelText } = render(
      <AllRecapsForm {...defaultProps} selectedKind={RecapKind.SideProjects} initialRecap={null} />,
    );

    expect(getByLabelText(RecapFields.sideProjectsTitle)).toBeVisible();
  });

  test("should show publications form given publications is selected", () => {
    const { getByLabelText } = render(
      <AllRecapsForm {...defaultProps} selectedKind={RecapKind.Publications} initialRecap={null} />,
    );

    expect(getByLabelText(RecapFields.publicationsTitle)).toBeVisible();
  });

  test("should show references form given references is selected", () => {
    const { getByLabelText } = render(
      <AllRecapsForm {...defaultProps} selectedKind={RecapKind.References} initialRecap={null} />,
    );

    expect(getByLabelText(RecapFields.referencesTitle)).toBeVisible();
  });

  test("should show other form given other is selected", () => {
    const { getByLabelText } = render(
      <AllRecapsForm {...defaultProps} selectedKind={RecapKind.Other} initialRecap={null} />,
    );

    expect(getByLabelText(RecapFields.otherTitle)).toBeVisible();
  });
});
