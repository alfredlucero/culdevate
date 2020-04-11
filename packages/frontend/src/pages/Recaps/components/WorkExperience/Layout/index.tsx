import React, { useState } from "react";
import * as RecapLayout from "../../RecapLayout";
import { RecapLayoutProps } from "../../RecapLayout";
import WorkExperienceEmptyCard from "../EmptyCard";
import WorkExperienceRecap from "../Recap";
import RecapsConfirmDeleteModal from "../../RecapsConfirmDeleteModal";
import {
  RecapsCreateSuccessAlert,
  RecapsUpdateSuccessAlert,
  RecapsDeleteSuccessAlert,
  RecapsDeleteErrorAlert,
} from "../../RecapsAlerts";
import RecapWorkExperienceForm from "../Form";
import RecapsCreateModal from "../../RecapsCreateModal";
import RecapsEditModal from "../../RecapsEditModal";
import { Recap, RecapWorkExperience } from "../../../recaps.interface";
import { useRecapsAlerts } from "../../../hooks/useRecapsAlerts";
import { useDeleteRecap } from "../../../hooks/useDeleteRecap";

export interface WorkExperienceLayoutProps extends RecapLayoutProps {
  recaps: RecapWorkExperience[];
}

// TODO: custom hooks to make other pages' lives simpler
// hook for useCreateRecap
// hook for useUpdateRecap

const WorkExperienceLayout: React.FC<WorkExperienceLayoutProps> = ({
  recaps,
  onGoBackToLanding,
  onCreateRecapSuccess,
  onUpdateRecapSuccess,
  onDeleteRecapSuccess,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  const {
    alertsState,
    showCreateSuccessAlert,
    showUpdateSuccessAlert,
    showDeleteSuccessAlert,
    showDeleteErrorAlert,
    hideAlert,
  } = useRecapsAlerts();

  const [isShowingCreateModal, setIsShowingCreateModal] = useState(false);
  const onShowCreateModal = () => {
    setIsShowingCreateModal(true);
  };
  const onHideCreateModal = () => {
    setIsShowingCreateModal(false);
  };

  const [isShowingEditModal, setIsShowingEditModal] = useState(false);
  const onShowEditModal = () => {};
  const onHideEditModal = () => {
    setIsShowingEditModal(false);
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
          kind="Work Experience"
          className="mb-4"
        />
        <RecapsDeleteErrorAlert
          isShowing={alertsState.isShowingDeleteErrorAlert}
          onHide={hideAlert}
          kind="Work Experience"
          className="mb-4"
        />
        <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
          <RecapLayout.HeaderTitle>Work Experience</RecapLayout.HeaderTitle>
        </RecapLayout.Header>
        <RecapLayout.Content>
          <WorkExperienceEmptyCard onClickAdd={onShowCreateModal} testId="workExperienceEmptyCard" />
        </RecapLayout.Content>

        <RecapsCreateModal isShowing={isShowingCreateModal} onHide={onHideCreateModal} kind="Work Experience">
          <RecapWorkExperienceForm
            isShowing={isShowingCreateModal}
            onHide={onHideCreateModal}
            onSaveSuccess={() => {}}
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
        kind="Work Experience"
        className="mb-4"
      />
      <RecapsUpdateSuccessAlert
        isShowing={alertsState.isShowingUpdateSuccessAlert}
        onHide={hideAlert}
        kind="Work Experience"
        className="mb-4"
      />
      <RecapsDeleteSuccessAlert
        isShowing={alertsState.isShowingDeleteSuccessAlert}
        onHide={hideAlert}
        kind="Work Experience"
        className="mb-4"
      />
      <RecapsDeleteErrorAlert
        isShowing={alertsState.isShowingDeleteErrorAlert}
        onHide={hideAlert}
        kind="Work Experience"
        className="mb-4"
      />
      <RecapLayout.Header className="mb-8" onClickBack={onGoBackToLanding}>
        <RecapLayout.HeaderTitle onClickAdd={onShowCreateModal}>Work Experience</RecapLayout.HeaderTitle>
        <RecapLayout.HeaderDescription>
          Recap everything about your career from internships to full-time jobs and opportunities.
        </RecapLayout.HeaderDescription>
      </RecapLayout.Header>
      <RecapLayout.Content>
        {recaps.map((workExperience, key) => (
          <WorkExperienceRecap
            workExperience={workExperience}
            onEdit={() => {
              // TODO: open up this recap's edit modal
            }}
            onDelete={onClickDeleteRecap}
            key={key}
            testId="workExperienceRecap"
            className="mb-4"
          />
        ))}
      </RecapLayout.Content>

      <RecapsConfirmDeleteModal
        isShowing={isShowingConfirmDeleteModal}
        onHide={onHideConfirmDeleteModal}
        isProcessingDelete={isProcessingDelete}
        onClickConfirmDelete={onClickConfirmDelete}
      />

      <RecapsCreateModal isShowing={isShowingCreateModal} onHide={onHideCreateModal} kind="Work Experience">
        <RecapWorkExperienceForm isShowing={isShowingCreateModal} onHide={onHideCreateModal} onSaveSuccess={() => {}} />
      </RecapsCreateModal>
    </RecapLayout.Container>
  );
};

export default WorkExperienceLayout;
