import React from "react";
import cn from "classnames";
import Card from "../../../../../components/Card";
import Text from "../../../../../components/Text";
import Heading from "../../../../../components/Heading";
import Button from "../../../../../components/Button";
import Icon from "../../../../../components/Icon";
import BulletPoint from "../../BulletPoint";
import RecapIcon from "../../RecapIcon";
import { RecapReferences } from "../../../recaps.interface";
import { CommonProps } from "../../../../../components/commonProps";

interface ReferencesRecapProps extends CommonProps {
  references: RecapReferences;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const ReferencesRecap: React.FC<ReferencesRecapProps> = ({
  references,
  onEdit,
  onDelete,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <Card className={cn("p-4", "flex", className)} testId={testId} {...passThroughProps}>
      <RecapIcon variant="references" className="mr-4" />
      <div className="flex-auto">
        <Heading variant="h4">{references.title}</Heading>
        <Text variant="p">{references.company}</Text>
        {references.email !== "" && <Text variant="p">{references.email}</Text>}
        {references.phoneNumber !== "" && <Text variant="p">{references.phoneNumber}</Text>}
        <ul className="mt-3">
          {references.bulletPoints.map((bulletPoint, index) => (
            <BulletPoint bulletPoint={bulletPoint} key={index} />
          ))}
        </ul>
      </div>
      <div className="w-1/3 text-right">
        <Button id={references._id} type="button" variant="secondary" onClick={onEdit} className="mr-2">
          <Icon variant="editPencil" size="small" className="mr-2" /> Edit
        </Button>
        <Button id={references._id} type="button" variant="danger" onClick={onDelete}>
          <Icon variant="trash" size="small" className="mr-2" />
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default ReferencesRecap;
