import React from "react";
import cn from "classnames";
import { format } from "date-fns";
import Card from "../../../../../components/Card";
import Text from "../../../../../components/Text";
import Heading from "../../../../../components/Heading";
import Button from "../../../../../components/Button";
import Icon from "../../../../../components/Icon";
import BulletPoint from "../../BulletPoint";
import RecapIcon from "../../RecapIcon";
import { RecapOrganizations } from "../../../recaps.interface";
import { CommonProps } from "../../../../../components/commonProps";

interface OrganizationsRecapProps extends CommonProps {
  organizations: RecapOrganizations;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const OrganizationsRecap: React.FC<OrganizationsRecapProps> = ({
  organizations,
  onEdit,
  onDelete,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <Card className={cn("p-4", "flex", className)} testId={testId} {...passThroughProps}>
      <RecapIcon variant="organizations" className="mr-4" />
      <div className="flex-auto">
        <Heading variant="h4">{organizations.organizationName}</Heading>
        <Text variant="p">{organizations.location}</Text>
        <Text variant="p">{organizations.positions}</Text>
        <Text variant="p" italic={true} className="text-gray-600">
          {format(organizations.startDate, "yyyy")} -{" "}
          {organizations.endDate ? format(organizations.endDate, "yyyy") : "Present"}
        </Text>
        <ul className="mt-3">
          {organizations.bulletPoints.map((bulletPoint, index) => (
            <BulletPoint bulletPoint={bulletPoint} key={index} />
          ))}
        </ul>
      </div>
      <div className="w-1/3 text-right">
        <Button id={organizations._id} type="button" variant="secondary" onClick={onEdit} className="mr-2">
          <Icon variant="editPencil" size="small" className="mr-2" /> Edit
        </Button>
        <Button id={organizations._id} type="button" variant="danger" onClick={onDelete}>
          <Icon variant="trash" size="small" className="mr-2" />
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default OrganizationsRecap;
