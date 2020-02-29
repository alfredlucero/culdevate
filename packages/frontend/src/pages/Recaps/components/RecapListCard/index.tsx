import React from "react";
import cn from "classnames";
import Card from "../../../../components/Card";
import Heading from "../../../../components/Heading";
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

interface ActionsProps extends CommonProps {
  onClickAdd: () => void;
  onClickView: () => void;
}

const Actions: React.FC<ActionsProps> = ({
  onClickAdd,
  onClickView,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  return (
    <div
      className={cn("flex", "justify-center", className)}
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      <Button type="button" variant="secondary" onClick={onClickView} className="mr-2">
        View
      </Button>
      <Button type="button" variant="primary" onClick={onClickAdd}>
        Add
      </Button>
    </div>
  );
};

interface CountProps extends CommonProps {
  count: number;
}

const Count: React.FC<CountProps> = ({ count, testId = "", className = "", ...passThroughProps }) => {
  return (
    <div
      className={cn(
        "rounded",
        "bg-gray-200",
        "text-gray-700",
        "text-sm",
        "p-2",
        "w-8",
        "flex",
        "justify-center",
        "items-center",
        className,
      )}
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      {count}
    </div>
  );
};

interface CardProps extends CommonProps {
  children: React.ReactNode;
}

const ListCard: React.FC<CardProps> = ({ children, testId = "", className = "", ...passThroughProps }) => {
  return (
    <Card testId={testId} className={cn("w-64", className)} {...passThroughProps}>
      {children}
    </Card>
  );
};

export interface RecapListCardProps extends CommonProps {
  onClickAdd: () => void;
  onClickView: () => void;
  count: number;
}

export { ListCard, Icon, Kind, Actions, Count };
