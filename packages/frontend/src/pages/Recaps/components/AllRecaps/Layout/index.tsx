import React, { useState, useMemo } from "react";
import Heading from "../../../../../components/Heading";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import AllRecapsEmptyCard from "../EmptyCard";
import RecapsConfirmDeleteModal from "../../RecapsConfirmDeleteModal";
import {
  RecapsCreateSuccessAlert,
  RecapsUpdateSuccessAlert,
  RecapsDeleteSuccessAlert,
  RecapsDeleteErrorAlert,
} from "../../RecapsAlerts";
import AllRecapsForm from "../Form";
import KindSelect from "../../KindSelect";
import RecapsCreateModal from "../../RecapsCreateModal";
import RecapsEditModal from "../../RecapsEditModal";
import WorkExperienceRecap from "../../WorkExperience/Recap";
import EducationRecap from "../../Education/Recap";
import AccomplishmentsRecap from "../../Accomplishments/Recap";
import SkillsRecap from "../../Skills/Recap";
import OrganizationsRecap from "../../Organizations/Recap";
import SideProjectsRecap from "../../SideProjects/Recap";
import PublicationsRecap from "../../Publications/Recap";
import ReferencesRecap from "../../References/Recap";
import OtherRecap from "../../Other/Recap";
import {
  Recap,
  RecapWorkExperience,
  RecapEducation,
  RecapAccomplishments,
  RecapOrganizations,
  RecapSkills,
  RecapSideProjects,
  RecapPublications,
  RecapReferences,
  RecapOther,
  RecapKind,
} from "../../../recaps.interface";
import { useRecapsAlerts } from "../../../hooks/useRecapsAlerts";
import { useDeleteRecap } from "../../../hooks/useDeleteRecap";

interface RecapsMap {
  workExperience: RecapWorkExperience[];
  education: RecapEducation[];
  accomplishments: RecapAccomplishments[];
  organizations: RecapOrganizations[];
  skills: RecapSkills[];
  sideProjects: RecapSideProjects[];
  publications: RecapPublications[];
  references: RecapReferences[];
  other: RecapOther[];
}

export interface AllRecapsLayoutProps extends RecapLayoutProps {
  recapsMap: RecapsMap;
}

const AllRecapsLayout: React.FC<AllRecapsLayoutProps> = ({
  recapsMap,
  onGoBackToLanding,
  onCreateRecapSuccess,
  onUpdateRecapSuccess,
  onDeleteRecapSuccess,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  const recaps = useMemo(() => {
    return [
      ...recapsMap.workExperience,
      ...recapsMap.education,
      ...recapsMap.accomplishments,
      ...recapsMap.organizations,
      ...recapsMap.skills,
      ...recapsMap.sideProjects,
      ...recapsMap.publications,
      ...recapsMap.references,
      ...recapsMap.other,
    ];
  }, [recapsMap]);
  const {
    alertsState,
    showCreateSuccessAlert,
    showUpdateSuccessAlert,
    showDeleteSuccessAlert,
    showDeleteErrorAlert,
    hideAlert,
  } = useRecapsAlerts();

  const [createSelectedKind, setCreateSelectedKind] = useState<RecapKind>(RecapKind.WorkExperience);
  const onChangeCreateSelectedKind = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateSelectedKind(e.currentTarget.value as RecapKind);
  };
  const [isShowingCreateModal, setIsShowingCreateModal] = useState(false);
  const onShowCreateModal = () => {
    setIsShowingCreateModal(true);
  };
  const onHideCreateModal = () => {
    setIsShowingCreateModal(false);
  };
  const onSaveSuccessCreate = (createdRecap: Recap) => {
    onCreateRecapSuccess(createdRecap);
    showCreateSuccessAlert();
  };

  const [isShowingEditModal, setIsShowingEditModal] = useState(false);
  const [selectedEditRecap, setSelectedEditRecap] = useState<Recap | null>(null);
  const onClickEditRecap = (e: React.MouseEvent) => {
    const recapId = e.currentTarget.id;

    const newSelectedEditRecap = recaps.find(recap => recap._id === recapId);

    if (!newSelectedEditRecap) {
      return;
    }

    setSelectedEditRecap(newSelectedEditRecap);
    setIsShowingEditModal(true);
  };
  const onHideEditModal = () => {
    setIsShowingEditModal(false);
  };
  const onSaveSuccessEdit = (updatedRecap: Recap) => {
    onUpdateRecapSuccess(updatedRecap);
    showUpdateSuccessAlert();
  };

  const {
    isShowingConfirmDeleteModal,
    isProcessingDelete,
    onClickDeleteRecap,
    onClickConfirmDelete,
    onHideConfirmDeleteModal,
  } = useDeleteRecap({
    recaps,
    onDeleteSuccess: (deletedRecap: Recap) => {
      onDeleteRecapSuccess(deletedRecap);
      showDeleteSuccessAlert();
    },
    onDeleteError: () => {
      showDeleteErrorAlert();
    },
  });

  const hasRecaps = recaps.length > 0;

  if (!hasRecaps) {
    return (
      <RecapLayout.Container testId={testId} className={className} {...passThroughProps}>
        <RecapsDeleteSuccessAlert
          isShowing={alertsState.isShowingDeleteSuccessAlert}
          onHide={hideAlert}
          kind={RecapKind.AllRecaps}
          className="mb-4"
        />
        <RecapsDeleteErrorAlert
          isShowing={alertsState.isShowingDeleteErrorAlert}
          onHide={hideAlert}
          kind={RecapKind.AllRecaps}
          className="mb-4"
        />
        <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
          <RecapLayout.HeaderTitle>{RecapKind.AllRecaps}</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <AllRecapsEmptyCard onClickAdd={onShowCreateModal} testId="allRecapsEmptyCard" />
        </RecapLayout.Content>

        <RecapsCreateModal isShowing={isShowingCreateModal} onHide={onHideCreateModal} kind={createSelectedKind}>
          <div className="flex my-4">
            <KindSelect
              id="allRecapsCreateKindSelect"
              onChange={onChangeCreateSelectedKind}
              value={createSelectedKind}
            />
          </div>
          <AllRecapsForm
            selectedKind={createSelectedKind}
            initialRecap={null}
            isShowing={isShowingCreateModal}
            onHide={onHideCreateModal}
            onSaveSuccess={onSaveSuccessCreate}
          />
        </RecapsCreateModal>
      </RecapLayout.Container>
    );
  }

  return (
    <RecapLayout.Container testId={testId} className={className} {...passThroughProps}>
      <RecapsCreateSuccessAlert
        isShowing={alertsState.isShowingCreateSuccessAlert}
        onHide={hideAlert}
        kind={RecapKind.AllRecaps}
        className="mb-4"
      />
      <RecapsUpdateSuccessAlert
        isShowing={alertsState.isShowingUpdateSuccessAlert}
        onHide={hideAlert}
        kind={RecapKind.AllRecaps}
        className="mb-4"
      />
      <RecapsDeleteSuccessAlert
        isShowing={alertsState.isShowingDeleteSuccessAlert}
        onHide={hideAlert}
        kind={RecapKind.AllRecaps}
        className="mb-4"
      />
      <RecapsDeleteErrorAlert
        isShowing={alertsState.isShowingDeleteErrorAlert}
        onHide={hideAlert}
        kind={RecapKind.AllRecaps}
        className="mb-4"
      />
      <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
        <RecapLayout.HeaderTitle onClickAdd={onShowCreateModal}>{RecapKind.AllRecaps}</RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Start remembering all the things you did for your future self or employer.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recapsMap.workExperience.length > 0 && (
          <>
            <Heading variant="h3" className="mb-4">
              {RecapKind.WorkExperience}
            </Heading>
            {recapsMap.workExperience.map((workExperience, key) => (
              <WorkExperienceRecap
                workExperience={workExperience}
                onEdit={onClickEditRecap}
                onDelete={onClickDeleteRecap}
                key={key}
                testId="workExperienceRecap"
                className="mb-4"
              />
            ))}
          </>
        )}
        {recapsMap.education.length > 0 && (
          <>
            <Heading variant="h3" className="mb-4">
              {RecapKind.Education}
            </Heading>
            {recapsMap.education.map((education, key) => (
              <EducationRecap
                education={education}
                onEdit={onClickEditRecap}
                onDelete={onClickDeleteRecap}
                key={key}
                testId="educationRecap"
                className="mb-4"
              />
            ))}
          </>
        )}
        {recapsMap.accomplishments.length > 0 && (
          <>
            <Heading variant="h3" className="mb-4">
              {RecapKind.Accomplishments}
            </Heading>
            {recapsMap.accomplishments.map((accomplishments, key) => (
              <AccomplishmentsRecap
                accomplishments={accomplishments}
                onEdit={onClickEditRecap}
                onDelete={onClickDeleteRecap}
                key={key}
                testId="accomplishmentsRecap"
                className="mb-4"
              />
            ))}
          </>
        )}
        {recapsMap.skills.length > 0 && (
          <>
            <Heading variant="h3" className="mb-4">
              {RecapKind.Skills}
            </Heading>
            {recapsMap.skills.map((skills, key) => (
              <SkillsRecap
                skills={skills}
                onEdit={onClickEditRecap}
                onDelete={onClickDeleteRecap}
                key={key}
                testId="skillsRecap"
                className="mb-4"
              />
            ))}
          </>
        )}
        {recapsMap.organizations.length > 0 && (
          <>
            <Heading variant="h3" className="mb-4">
              {RecapKind.Organizations}
            </Heading>
            {recapsMap.organizations.map((organizations, key) => (
              <OrganizationsRecap
                organizations={organizations}
                onEdit={onClickEditRecap}
                onDelete={onClickDeleteRecap}
                key={key}
                testId="organizationsRecap"
                className="mb-4"
              />
            ))}
          </>
        )}
        {recapsMap.sideProjects.length > 0 && (
          <>
            <Heading variant="h3" className="mb-4">
              {RecapKind.SideProjects}
            </Heading>
            {recapsMap.sideProjects.map((sideProjects, key) => (
              <SideProjectsRecap
                sideProjects={sideProjects}
                onEdit={onClickEditRecap}
                onDelete={onClickDeleteRecap}
                key={key}
                testId="sideProjectsRecap"
                className="mb-4"
              />
            ))}
          </>
        )}
        {recapsMap.publications.length > 0 && (
          <>
            <Heading variant="h3" className="mb-4">
              {RecapKind.Publications}
            </Heading>
            {recapsMap.publications.map((publications, key) => (
              <PublicationsRecap
                publications={publications}
                onEdit={onClickEditRecap}
                onDelete={onClickDeleteRecap}
                key={key}
                testId="publicationsRecap"
                className="mb-4"
              />
            ))}
          </>
        )}
        {recapsMap.references.length > 0 && (
          <>
            <Heading variant="h3" className="mb-4">
              {RecapKind.References}
            </Heading>
            {recapsMap.references.map((references, key) => (
              <ReferencesRecap
                references={references}
                onEdit={onClickEditRecap}
                onDelete={onClickDeleteRecap}
                key={key}
                testId="referencesRecap"
                className="mb-4"
              />
            ))}
          </>
        )}
        {recapsMap.other.length > 0 && (
          <>
            <Heading variant="h3" className="mb-4">
              {RecapKind.Other}
            </Heading>
            {recapsMap.other.map((other, key) => (
              <OtherRecap
                other={other}
                onEdit={onClickEditRecap}
                onDelete={onClickDeleteRecap}
                key={key}
                testId="otherRecap"
                className="mb-4"
              />
            ))}
          </>
        )}
      </RecapLayout.Content>

      <RecapsConfirmDeleteModal
        isShowing={isShowingConfirmDeleteModal}
        onHide={onHideConfirmDeleteModal}
        isProcessingDelete={isProcessingDelete}
        onClickConfirmDelete={onClickConfirmDelete}
      />

      <RecapsCreateModal isShowing={isShowingCreateModal} onHide={onHideCreateModal} kind={createSelectedKind}>
        <div className="flex my-4">
          <KindSelect id="allRecapsCreateKindSelect" onChange={onChangeCreateSelectedKind} value={createSelectedKind} />
        </div>
        <AllRecapsForm
          selectedKind={createSelectedKind}
          initialRecap={null}
          isShowing={isShowingCreateModal}
          onHide={onHideCreateModal}
          onSaveSuccess={onSaveSuccessCreate}
        />
      </RecapsCreateModal>

      <RecapsEditModal
        isShowing={isShowingEditModal}
        onHide={onHideEditModal}
        kind={selectedEditRecap ? selectedEditRecap.kind : RecapKind.WorkExperience}
      >
        <AllRecapsForm
          selectedKind={selectedEditRecap ? selectedEditRecap.kind : RecapKind.WorkExperience}
          initialRecap={selectedEditRecap}
          isShowing={isShowingEditModal}
          onHide={onHideEditModal}
          onSaveSuccess={onSaveSuccessEdit}
        />
      </RecapsEditModal>
    </RecapLayout.Container>
  );
};

export default AllRecapsLayout;
