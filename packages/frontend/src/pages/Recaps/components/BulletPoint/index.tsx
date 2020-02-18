import React from "react";
import cn from "classnames";
import Icon from "../../../../components/Icon";
import Text from "../../../../components/Text";
import { CommonProps } from "../../../../components/commonProps";

export interface BulletPointProps extends CommonProps {
  bulletPoint: string;
}

const BulletPoint: React.FC<BulletPointProps> = ({ bulletPoint, testId = "", className = "", ...passThroughProps }) => {
  return (
    <li
      className={cn("flex", "items-center", className)}
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      <Icon variant="bulletpoint" size="small" className="mr-2 text-teal-300" />
      <Text variant="p" className="pt-1">
        {bulletPoint}
      </Text>
    </li>
  );
};

export default BulletPoint;
