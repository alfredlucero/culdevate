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
import { RecapEducation } from "../../../recaps.interface";
import { CommonProps } from "../../../../../components/commonProps";

interface EducationRecapProps extends CommonProps {
  education: RecapEducation;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const EducationRecap: React.FC<EducationRecapProps> = ({
  education,
  onEdit,
  onDelete,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <Card className={cn("p-4", "flex", className)} testId={testId} {...passThroughProps}>
      <RecapIcon variant="education" className="mr-4" />
      <div className="flex-auto">
        <Heading variant="h4">{education.school}</Heading>
        <Text variant="p">{education.location}</Text>
        <Text variant="p">
          {education.degree}, {education.fieldOfStudy}
        </Text>
        <Text variant="p" italic={true} className="text-gray-600">
          {format(parseISO(education.startDate), "yyyy")} -{" "}
          {education.endDate ? format(parseISO(education.endDate), "yyyy") : "Present"}
          <br />
          {education.grade}
        </Text>
        <ul className="mt-3">
          {education.bulletPoints.map((bulletPoint, index) => (
            <BulletPoint bulletPoint={bulletPoint} key={index} />
          ))}
        </ul>
      </div>
      <div className="w-1/3 text-right">
        <Button id={education._id} type="button" variant="secondary" onClick={onEdit} className="mr-2">
          <Icon variant="editPencil" size="small" className="mr-2" /> Edit
        </Button>
        <Button id={education._id} type="button" variant="danger" onClick={onDelete}>
          <Icon variant="trash" size="small" className="mr-2" />
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default EducationRecap;
