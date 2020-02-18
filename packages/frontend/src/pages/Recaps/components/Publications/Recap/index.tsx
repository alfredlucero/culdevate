import React from "react";
import cn from "classnames";
import { format } from "date-fns";
import Card from "../../../../../components/Card";
import Text from "../../../../../components/Text";
import Heading from "../../../../../components/Heading";
import Button from "../../../../../components/Button";
import Icon from "../../../../../components/Icon";
import Link from "../../../../../components/Link";
import BulletPoint from "../../BulletPoint";
import RecapIcon from "../../RecapIcon";
import { RecapPublications } from "../../../../../interfaces/recaps.interface";
import { CommonProps } from "../../../../../components/commonProps";

interface PublicationsRecapProps extends CommonProps {
  publications: RecapPublications;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const PublicationsRecap: React.FC<PublicationsRecapProps> = ({
  publications,
  onEdit,
  onDelete,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  return (
    <Card className={cn("p-4", "flex", className)} testId={testId} {...passThroughProps}>
      <RecapIcon variant="publications" className="mr-4" />
      <div className="flex-auto">
        <Heading variant="h4">{publications.title}</Heading>
        <Text variant="p">By {publications.coauthors}</Text>
        <Text variant="p" italic={true} className="text-gray-600">
          {format(publications.startDate, "MMMM dd, yyyy")}
        </Text>
        <Text variant="p">
          {publications.publisher} ({publications.type})
        </Text>
        {publications.url && (
          <Text variant="p">
            <Link href={publications.url} type="external">{`${publications.url.substr(0, 30)}...`}</Link>
          </Text>
        )}
        <ul className="mt-3">
          {publications.bulletPoints.map((bulletPoint, index) => (
            <BulletPoint bulletPoint={bulletPoint} key={index} />
          ))}
        </ul>
      </div>
      <div className="w-1/3 text-right">
        <Button id={publications._id} type="button" variant="secondary" onClick={onEdit} className="mr-2">
          <Icon variant="editPencil" size="small" className="mr-2" /> Edit
        </Button>
        <Button id={publications._id} type="button" variant="danger" onClick={onDelete}>
          <Icon variant="trash" size="small" className="mr-2" />
          Delete
        </Button>
      </div>
    </Card>
  );
};

export default PublicationsRecap;
