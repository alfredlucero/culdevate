import React from "react";
import cn from "classnames";
import Card from "../../../../components/Card";
import Heading from "../../../../components/Heading";
import Button from "../../../../components/Button";
import RecapIcon, { RecapIconProps } from "../RecapIcon";
import { RecapKind } from "../../recaps.interface";
import { CommonProps } from "../../../../components/commonProps";

interface IconProps extends CommonProps {
  kind: RecapKind;
}

type RecapKindToIconMap = {
  [kind in RecapKind]: RecapIconProps["variant"];
};

const recapKindToIconMap: RecapKindToIconMap = {
  ["Work Experience"]: "work",
  ["Education"]: "education",
  ["Accomplishments"]: "accomplishments",
  ["Publications"]: "publications",
  ["Skills"]: "skills",
  ["Side Projects"]: "projects",
  ["Organizations"]: "organizations",
  ["References"]: "references",
  ["Other"]: "other",
};

const Icon: React.FC<IconProps> = ({ kind, className = "", testId = "", ...passThroughProps }) => {
  const iconVariant = recapKindToIconMap[kind];
  return (
    <div className={cn(className)} {...(testId !== "" ? { "data-testid": testId } : {})} {...passThroughProps}>
      <RecapIcon variant={iconVariant} />
    </div>
  );
};

interface KindProps extends CommonProps {
  kind: RecapKind;
}

const Kind: React.FC<KindProps> = ({ kind, className = "", testId = "", ...passThroughProps }) => {
  return (
    <Heading variant="h4" className={className} testId={testId} {...passThroughProps}>
      {kind}
    </Heading>
  );
};

interface CardProps extends CommonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const ListCard: React.FC<CardProps> = ({ children, testId = "", className = "", ...passThroughProps }) => {
  return (
    <Button
      type="button"
      variant="unstyled"
      testId={testId}
      className={cn("w-64", "hover:bg-blue-100", className)}
      {...passThroughProps}
    >
      <Card
        className={cn(
          "h-56",
          "flex",
          "items-center",
          "justify-center",
          "flex-col",
          "border-b-8",
          "border-teal-400",
          "border-solid",
        )}
        {...{ style: { backgroundColor: "inherit" } }}
      >
        {children}
      </Card>
    </Button>
  );
};

export interface RecapListCardProps extends CommonProps {
  onClick: () => void;
}

export { ListCard, Icon, Kind };
