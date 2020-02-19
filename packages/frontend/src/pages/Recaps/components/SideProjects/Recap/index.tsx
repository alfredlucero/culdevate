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
import { RecapSideProjects } from "../../../../../interfaces/recaps.interface";
import { CommonProps } from "../../../../../components/commonProps";

interface SideProjectsRecapProps extends CommonProps {
  sideProjects: RecapSideProjects;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const SideProjectsRecap: React.FC<SideProjectsRecapProps> = ({
  sideProjects,
  onEdit,
  onDelete,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <Card className={cn("p-4", "flex", className)} testId={testId} {...passThroughProps}>
      <RecapIcon variant="projects" className="mr-4" />
      <div className="flex-auto">
        <Heading variant="h4">{sideProjects.title}</Heading>
        <Text variant="p">By {sideProjects.creators}</Text>
        <Text variant="p" italic={true} className="text-gray-600">
          {format(sideProjects.startDate, "MMMM yyyy")} -{" "}
          {sideProjects.endDate ? format(sideProjects.endDate, "MMMM yyyy") : "Present"}
        </Text>
        <ul className="mt-3">
          {sideProjects.bulletPoints.map((bulletPoint, index) => (
            <BulletPoint bulletPoint={bulletPoint} key={index} />
          ))}
        </ul>
      </div>
      <div className="w-1/3 text-right">
        <Button id={sideProjects._id} type="button" variant="secondary" onClick={onEdit} className="mr-2">
          <Icon variant="editPencil" size="small" className="mr-2" /> Edit
        </Button>
        <Button id={sideProjects._id} type="button" variant="danger" onClick={onDelete}>
          <Icon variant="trash" size="small" className="mr-2" />
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default SideProjectsRecap;
