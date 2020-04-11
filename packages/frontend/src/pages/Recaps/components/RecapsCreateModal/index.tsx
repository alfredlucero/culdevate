import React from "react";
import FullScreenModal from "../../../../components/FullScreenModal";
import Heading from "../../../../components/Heading";
import { RecapKind } from "../../recaps.interface";

interface RecapsCreateModalProps {
  isShowing: boolean;
  onHide: () => void;
  children: React.ReactNode;
  kind: RecapKind;
}

const RecapsCreateModal: React.FC<RecapsCreateModalProps> = ({ isShowing, onHide, children, kind }) => {
  return (
    <FullScreenModal isShowing={isShowing} onHide={onHide}>
      <Heading variant="h3">Create a {kind} Recap</Heading>
      {children}
    </FullScreenModal>
  );
};

export default RecapsCreateModal;
