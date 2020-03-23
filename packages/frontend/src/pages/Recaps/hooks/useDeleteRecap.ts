import React, { useState } from "react";
import { deleteRecap } from "../recaps.service";
import { Recap } from "../recaps.interface";

export interface UseDeleteRecapArgs {
  recaps: Recap[];
  onDeleteSuccess: (deletedRecap: Recap) => void;
  onDeleteError: () => void;
}

export interface UseDeleteRecap {
  isShowingConfirmDeleteModal: boolean;
  isProcessingDelete: boolean;
  onClickDeleteRecap: (e: React.MouseEvent) => void;
  onClickConfirmDelete: () => void;
  onHideConfirmDeleteModal: () => void;
}

export const useDeleteRecap = ({ recaps, onDeleteSuccess, onDeleteError }: UseDeleteRecapArgs): UseDeleteRecap => {
  const [selectedRecap, setSelectedRecap] = useState<Recap | null>(null);

  const [isShowingConfirmDeleteModal, setIsShowingConfirmDeleteModal] = useState(false);
  const [isProcessingDelete, setIsProcessingDelete] = useState(false);

  const onHideConfirmDeleteModal = () => {
    setIsShowingConfirmDeleteModal(false);
    setSelectedRecap(null);
  };

  const onClickDeleteRecap = (e: React.MouseEvent) => {
    const recapId = e.currentTarget.id;

    const newSelectedRecap = recaps.find(recap => recap._id === recapId);

    if (!newSelectedRecap) {
      return;
    }

    setSelectedRecap(newSelectedRecap);
    setIsShowingConfirmDeleteModal(true);
  };

  const onClickConfirmDelete = () => {
    if (!selectedRecap) {
      return;
    }

    setIsProcessingDelete(true);
    deleteRecap(selectedRecap._id)
      .then(response => {
        const deletedRecap = response.data;
        setSelectedRecap(null);
        setIsProcessingDelete(false);
        setIsShowingConfirmDeleteModal(false);
        onDeleteSuccess(deletedRecap);
      })
      .catch(() => {
        setSelectedRecap(null);
        setIsProcessingDelete(false);
        setIsShowingConfirmDeleteModal(false);
        onDeleteError();
      });
  };

  return {
    isShowingConfirmDeleteModal,
    isProcessingDelete,
    onClickDeleteRecap,
    onClickConfirmDelete,
    onHideConfirmDeleteModal,
  };
};
