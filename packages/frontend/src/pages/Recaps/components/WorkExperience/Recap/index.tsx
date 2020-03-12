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
import { RecapWorkExperience } from "../../../recaps.interface";
import { CommonProps } from "../../../../../components/commonProps";

interface WorkExperienceRecapProps extends CommonProps {
  workExperience: RecapWorkExperience;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const WorkExperienceRecap: React.FC<WorkExperienceRecapProps> = ({
  workExperience,
  onEdit,
  onDelete,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <Card className={cn("p-4", "flex", className)} testId={testId} {...passThroughProps}>
      <RecapIcon variant="work" className="mr-4" />
      <div className="flex-auto">
        <Heading variant="h4">{workExperience.title}</Heading>
        <Text variant="p">
          {workExperience.company} | {workExperience.employmentType}
        </Text>
        <Text variant="p" italic={true} className="text-gray-600">
          {format(workExperience.startDate, "MMM yyyy")} -{" "}
          {workExperience.endDate ? format(workExperience.endDate, "MMM yyyy") : "Present"}
        </Text>
        <Text variant="p">{workExperience.location}</Text>
        <ul className="mt-3">
          {workExperience.bulletPoints.map((bulletPoint, index) => (
            <BulletPoint bulletPoint={bulletPoint} key={index} />
          ))}
        </ul>
      </div>
      <div className="w-1/3 text-right">
        <Button id={workExperience._id} type="button" variant="secondary" onClick={onEdit} className="mr-2">
          <Icon variant="editPencil" size="small" className="mr-2" /> Edit
        </Button>
        <Button id={workExperience._id} type="button" variant="danger" onClick={onDelete}>
          <Icon variant="trash" size="small" className="mr-2" />
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default WorkExperienceRecap;
