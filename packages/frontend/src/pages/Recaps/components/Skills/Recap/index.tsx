import React from "react";
import cn from "classnames";
import Card from "../../../../../components/Card";
import Text from "../../../../../components/Text";
import Heading from "../../../../../components/Heading";
import Button from "../../../../../components/Button";
import Icon from "../../../../../components/Icon";
import BulletPoint from "../../BulletPoint";
import RecapIcon from "../../RecapIcon";
import { RecapSkills } from "../../../../../interfaces/recaps.interface";
import { CommonProps } from "../../../../../components/commonProps";

interface SkillsRecapProps extends CommonProps {
  skills: RecapSkills;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const SkillsRecap: React.FC<SkillsRecapProps> = ({
  skills,
  onEdit,
  onDelete,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <Card className={cn("p-4", "flex", className)} testId={testId} {...passThroughProps}>
      <RecapIcon variant="skills" className="mr-4" />
      <div className="flex-auto">
        <Heading variant="h4">{skills.title}</Heading>
        <Text variant="p">{skills.proficiency}</Text>
        <ul className="mt-3">
          {skills.bulletPoints.map((bulletPoint, index) => (
            <BulletPoint bulletPoint={bulletPoint} key={index} />
          ))}
        </ul>
      </div>
      <div className="w-1/3 text-right">
        <Button id={skills._id} type="button" variant="secondary" onClick={onEdit} className="mr-2">
          <Icon variant="editPencil" size="small" className="mr-2" /> Edit
        </Button>
        <Button id={skills._id} type="button" variant="danger" onClick={onDelete}>
          <Icon variant="trash" size="small" className="mr-2" />
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default SkillsRecap;
