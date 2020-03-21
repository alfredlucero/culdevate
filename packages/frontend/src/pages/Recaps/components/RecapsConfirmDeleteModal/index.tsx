import React from "react";
import CenterModal, { CenterModalProps } from "../../../../components/CenterModal";
import Button from "../../../../components/Button";
import Heading from "../../../../components/Heading";
import Text from "../../../../components/Text";
import { CommonProps } from "../../../../components/commonProps";

interface RecapsConfirmDeleteModalProps extends CommonProps, Pick<CenterModalProps, "isShowing" | "onHide"> {
  onClickConfirmDelete: () => void;
  isProcessingDelete: boolean;
}

const RecapsConfirmDeleteModal: React.FC<RecapsConfirmDeleteModalProps> = ({
  isShowing,
  onHide,
  onClickConfirmDelete,
  isProcessingDelete,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  return (
    <CenterModal isShowing={isShowing} onHide={onHide} testId={testId} className={className} {...passThroughProps}>
      <Heading variant="h4" className="mb-4">
        Are you sure you want to delete this?
      </Heading>
      <Text variant="p" className="mb-4">
        Once you delete this Recap, it will be removed from this list unless you create it again.
      </Text>
      <div className="flex justify-end pt-4">
        <Button type="button" variant="secondary" onClick={onHide} className="mr-2">
          Cancel
        </Button>
        <Button type="button" variant="primary" onClick={onClickConfirmDelete} loading={isProcessingDelete}>
          {isProcessingDelete && <>Deleting...</>}
          {!isProcessingDelete && <>Delete</>}
        </Button>
      </div>
    </CenterModal>
  );
};

export default RecapsConfirmDeleteModal;
