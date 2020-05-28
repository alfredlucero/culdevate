import React from "react";
import Alert, { AlertProps } from "../../../../components/Alert";
import { CommonProps } from "../../../../components/commonProps";
import { RecapKind } from "../../recaps.interface";

interface RecapsDeleteSuccessAlertProps extends CommonProps {
  kind: RecapKind;
  isShowing: AlertProps["isShowing"];
  onHide: AlertProps["onHide"];
}

const RecapsDeleteSuccessAlert: React.FC<RecapsDeleteSuccessAlertProps> = ({
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
      {kind !== RecapKind.AllRecaps && <>You have successfully deleted the {kind} Recap!</>}
      {kind === RecapKind.AllRecaps && <>You have successfully deleted the Recap!</>}
    </Alert>
  );
};

export default RecapsDeleteSuccessAlert;
