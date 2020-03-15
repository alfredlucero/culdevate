import React from "react";
import cn from "classnames";
import { format, parseISO } from "date-fns";
import Card from "../../../../../components/Card";
import Text from "../../../../../components/Text";
import Heading from "../../../../../components/Heading";
import Button from "../../../../../components/Button";
import Icon from "../../../../../components/Icon";
import BulletPoint from "../../BulletPoint";
import RecapIcon from "../../RecapIcon";
import { RecapOther } from "../../../recaps.interface";
import { CommonProps } from "../../../../../components/commonProps";

interface OtherRecapProps extends CommonProps {
  other: RecapOther;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const OtherRecap: React.FC<OtherRecapProps> = ({
  other,
  onEdit,
  onDelete,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <Card className={cn("p-4", "flex", className)} testId={testId} {...passThroughProps}>
      <RecapIcon variant="other" className="mr-4" />
      <div className="flex-auto">
        <Heading variant="h4">{other.title}</Heading>
        <Text variant="p" italic={true} className="text-gray-600">
          {format(parseISO(other.startDate), "MMMM yyyy")} - {format(parseISO(other.endDate), "MMMM yyyy")}
        </Text>
        <ul className="mt-3">
          {other.bulletPoints.map((bulletPoint, index) => (
            <BulletPoint bulletPoint={bulletPoint} key={index} />
          ))}
        </ul>
      </div>
      <div className="w-1/3 text-right">
        <Button id={other._id} type="button" variant="secondary" onClick={onEdit} className="mr-2">
          <Icon variant="editPencil" size="small" className="mr-2" /> Edit
        </Button>
        <Button id={other._id} type="button" variant="danger" onClick={onDelete}>
          <Icon variant="trash" size="small" className="mr-2" />
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default OtherRecap;
