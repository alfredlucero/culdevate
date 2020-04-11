import React from "react";
import FullScreenModal from "../../../../components/FullScreenModal";
import Heading from "../../../../components/Heading";
import { RecapKind } from "../../recaps.interface";

interface RecapsEditModalProps {
  isShowing: boolean;
  onHide: () => void;
  children: React.ReactNode;
  kind: RecapKind;
}

const RecapsEditModal: React.FC<RecapsEditModalProps> = ({ isShowing, onHide, children, kind }) => {
  return (
    <FullScreenModal isShowing={isShowing} onHide={onHide}>
      <Heading variant="h3">Edit your {kind} Recap</Heading>
      {children}
    </FullScreenModal>
  );
};

export default RecapsEditModal;
