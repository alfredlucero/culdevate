import React from "react";
import WorkExperienceForm from "../../WorkExperience/Form";
import EducationForm from "../../Education/Form";
import AccomplishmentsForm from "../../Accomplishments/Form";
import OrganizationsForm from "../../Organizations/Form";
import SkillsForm from "../../Skills/Form";
import SideProjectsForm from "../../SideProjects/Form";
import PublicationsForm from "../../Publications/Form";
import ReferencesForm from "../../References/Form";
import OtherForm from "../../Other/Form";
import { CommonProps } from "../../../../../components/commonProps";
import {
  Recap,
  RecapKind,
  RecapWorkExperience,
  RecapEducation,
  RecapAccomplishments,
  RecapOrganizations,
  RecapSkills,
  RecapSideProjects,
  RecapPublications,
  RecapReferences,
  RecapOther,
} from "../../../recaps.interface";

export interface AllRecapsFormProps extends CommonProps {
  selectedKind: RecapKind;
  initialRecap: Recap | null;
  onSaveSuccess: (savedRecap: Recap) => void;
  isShowing: boolean;
  onHide: () => void;
}

const shouldShowRecapKindForm = ({
  selectedKind,
  expectedKind,
  initialRecap,
}: {
  selectedKind: RecapKind;
  expectedKind: RecapKind;
  initialRecap: Recap | null;
}): boolean => selectedKind === expectedKind && ((initialRecap && initialRecap.kind === expectedKind) || !initialRecap);

const AllRecapsForm: React.FC<AllRecapsFormProps> = ({
  selectedKind,
  initialRecap,
  onSaveSuccess,
  isShowing,
  onHide,
  testId,
  className,
  ...passThroughProps
}) => {
  if (shouldShowRecapKindForm({ selectedKind, expectedKind: RecapKind.WorkExperience, initialRecap })) {
    return (
      <WorkExperienceForm
        initialRecap={initialRecap as RecapWorkExperience | null}
        onSaveSuccess={onSaveSuccess}
        isShowing={isShowing}
        onHide={onHide}
        testId={testId}
        className={className}
        {...passThroughProps}
      />
    );
  }

  if (shouldShowRecapKindForm({ selectedKind, expectedKind: RecapKind.Education, initialRecap })) {
    return (
      <EducationForm
        initialRecap={initialRecap as RecapEducation | null}
        onSaveSuccess={onSaveSuccess}
        isShowing={isShowing}
        onHide={onHide}
        testId={testId}
        className={className}
        {...passThroughProps}
      />
    );
  }

  if (shouldShowRecapKindForm({ selectedKind, expectedKind: RecapKind.Accomplishments, initialRecap })) {
    return (
      <AccomplishmentsForm
        initialRecap={initialRecap as RecapAccomplishments | null}
        onSaveSuccess={onSaveSuccess}
        isShowing={isShowing}
        onHide={onHide}
        testId={testId}
        className={className}
        {...passThroughProps}
      />
    );
  }

  if (shouldShowRecapKindForm({ selectedKind, expectedKind: RecapKind.Organizations, initialRecap })) {
    return (
      <OrganizationsForm
        initialRecap={initialRecap as RecapOrganizations | null}
        onSaveSuccess={onSaveSuccess}
        isShowing={isShowing}
        onHide={onHide}
        testId={testId}
        className={className}
        {...passThroughProps}
      />
    );
  }

  if (shouldShowRecapKindForm({ selectedKind, expectedKind: RecapKind.Skills, initialRecap })) {
    return (
      <SkillsForm
        initialRecap={initialRecap as RecapSkills | null}
        onSaveSuccess={onSaveSuccess}
        isShowing={isShowing}
        onHide={onHide}
        testId={testId}
        className={className}
        {...passThroughProps}
      />
    );
  }

  if (shouldShowRecapKindForm({ selectedKind, expectedKind: RecapKind.SideProjects, initialRecap })) {
    return (
      <SideProjectsForm
        initialRecap={initialRecap as RecapSideProjects | null}
        onSaveSuccess={onSaveSuccess}
        isShowing={isShowing}
        onHide={onHide}
        testId={testId}
        className={className}
        {...passThroughProps}
      />
    );
  }

  if (shouldShowRecapKindForm({ selectedKind, expectedKind: RecapKind.Publications, initialRecap })) {
    return (
      <PublicationsForm
        initialRecap={initialRecap as RecapPublications | null}
        onSaveSuccess={onSaveSuccess}
        isShowing={isShowing}
        onHide={onHide}
        testId={testId}
        className={className}
        {...passThroughProps}
      />
    );
  }

  if (shouldShowRecapKindForm({ selectedKind, expectedKind: RecapKind.References, initialRecap })) {
    return (
      <ReferencesForm
        initialRecap={initialRecap as RecapReferences | null}
        onSaveSuccess={onSaveSuccess}
        isShowing={isShowing}
        onHide={onHide}
        testId={testId}
        className={className}
        {...passThroughProps}
      />
    );
  }

  if (shouldShowRecapKindForm({ selectedKind, expectedKind: RecapKind.Other, initialRecap })) {
    return (
      <OtherForm
        initialRecap={initialRecap as RecapOther | null}
        onSaveSuccess={onSaveSuccess}
        isShowing={isShowing}
        onHide={onHide}
        testId={testId}
        className={className}
        {...passThroughProps}
      />
    );
  }

  return null;
};

export default AllRecapsForm;
