import React from "react";
import Alert, { AlertProps } from "../../../../components/Alert";
import { CommonProps } from "../../../../components/commonProps";
import { RecapKind } from "../../recaps.interface";

interface RecapsDeleteErrorAlertProps extends CommonProps {
  kind: RecapKind;
  isShowing: AlertProps["isShowing"];
  onHide: AlertProps["onHide"];
}

const RecapsDeleteErrorAlert: React.FC<RecapsDeleteErrorAlertProps> = ({
  kind,
  isShowing,
  onHide,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  return (
    <Alert
      variant="danger"
      isShowing={isShowing}
      onHide={onHide}
      testId={testId}
      className={className}
      {...passThroughProps}
    >
      Something went wrong with deleting the {kind} Recap! Please try again or let us know if there is an issue!
    </Alert>
  );
};

export default RecapsDeleteErrorAlert;
