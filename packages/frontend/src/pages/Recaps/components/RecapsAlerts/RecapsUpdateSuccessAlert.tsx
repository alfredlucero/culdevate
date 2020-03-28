import React from "react";
import Alert, { AlertProps } from "../../../../components/Alert";
import { CommonProps } from "../../../../components/commonProps";
import { RecapKind } from "../../recaps.interface";

interface RecapsUpdateSuccessAlertProps extends CommonProps {
  kind: RecapKind;
  isShowing: AlertProps["isShowing"];
  onHide: AlertProps["onHide"];
}

const RecapsUpdateSuccessAlert: React.FC<RecapsUpdateSuccessAlertProps> = ({
  kind,
  isShowing,
  onHide,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  return (
    <Alert
      variant="success"
      isShowing={isShowing}
      onHide={onHide}
      testId={testId}
      className={className}
      {...passThroughProps}
    >
      You have successfully updated a {kind} Recap!
    </Alert>
  );
};

export default RecapsUpdateSuccessAlert;
