import React from "react";
import Alert, { AlertProps } from "../../../../components/Alert";
import { CommonProps } from "../../../../components/commonProps";
import { RecapKind } from "../../recaps.interface";

interface RecapsCreateSuccessAlertProps extends CommonProps {
  kind: RecapKind;
  isShowing: AlertProps["isShowing"];
  onHide: AlertProps["onHide"];
}

const RecapsCreateSuccessAlert: React.FC<RecapsCreateSuccessAlertProps> = ({
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
      {kind !== RecapKind.AllRecaps && <>You have successfully created a {kind} Recap!</>}
      {kind === RecapKind.AllRecaps && <>You have successfully created a Recap!</>}
    </Alert>
  );
};

export default RecapsCreateSuccessAlert;
