import React from "react";
import cn from "classnames";
import Card from "../../../../components/Card";
import Heading from "../../../../components/Heading";
import Text from "../../../../components/Text";
import Button from "../../../../components/Button";
import RecapIcon, { RecapIconProps } from "../RecapIcon";
import { RecapKind } from "../../../../interfaces/recaps.interface";
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

interface DescriptionProps extends CommonProps {
  children: React.ReactNode;
}

const Description: React.FC<DescriptionProps> = ({ children, className = "", testId = "", ...passThroughProps }) => {
  return (
    <Text variant="p" testId={testId} className={className}>
      {children}
    </Text>
  );
};

interface ActionsProps extends CommonProps {
  onClickAdd: () => void;
}

const Actions: React.FC<ActionsProps> = ({ onClickAdd, testId = "", className = "", ...passThroughProps }) => {
  return (
    <div
      className={cn("flex", "justify-center", className)}
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      <Button type="button" variant="primary" onClick={onClickAdd}>
        Add a Recap
      </Button>
    </div>
  );
};

interface CardProps extends CommonProps {
  children: React.ReactNode;
}

const EmptyCard: React.FC<CardProps> = ({ children, testId = "", className = "", ...passThroughProps }) => {
  return (
    <Card
      testId={testId}
      className={cn("h-64", "p-4", "flex", "flex-col", "justify-center", "items-center", className)}
      {...passThroughProps}
    >
      {children}
    </Card>
  );
};

export interface RecapEmptyCardProps extends CommonProps {
  onClickAdd: () => void;
}

export { EmptyCard, Icon, Kind, Description, Actions };
