import React from "react";
import cn from "classnames";
import Card from "../../../../components/Card";
import Icon from "../../../../components/Icon";
import Text from "../../../../components/Text";
import Button from "../../../../components/Button";
import { CommonProps } from "../../../../components/commonProps";

interface RecapsErrorCardProps extends CommonProps {
  onRetry: () => void;
}

const RecapsErrorCard: React.FC<RecapsErrorCardProps> = ({
  onRetry,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <Card
      className={cn("h-64", "p-6", "flex", "flex-col", "justify-center", "items-center", className)}
      testId={testId}
      {...passThroughProps}
    >
      <Icon className={cn("text-red-400", "mb-4")} variant="exclamationTriangle" size="large" />
      <Text variant="p" className={cn("text-center", "mb-6")}>
        Oops! Something went wrong with fetching your Recaps!
      </Text>
      <Button type="button" variant="primary" onClick={onRetry}>
        Retry
      </Button>
    </Card>
  );
};

export default RecapsErrorCard;
