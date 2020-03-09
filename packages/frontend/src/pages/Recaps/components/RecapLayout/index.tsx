import React from "react";
import cn from "classnames";
import Heading from "../../../../components/Heading";
import Button from "../../../../components/Button";
import Text from "../../../../components/Text";
import Icon from "../../../../components/Icon";
import { Recap } from "../../../../interfaces/recaps.interface";
import { CommonProps } from "../../../../components/commonProps";

interface ContainerProps extends CommonProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, testId = "", className = "", ...passThroughProps }) => {
  return (
    <div className={cn(className)} {...(testId !== "" ? { "data-testid": testId } : {})} {...passThroughProps}>
      {children}
    </div>
  );
};

interface HeaderProps extends CommonProps {
  children: React.ReactNode;
  onClickBack: () => void;
}

const Header: React.FC<HeaderProps> = ({ children, onClickBack, testId = "", className = "", ...passThroughProps }) => {
  return (
    <header className={cn(className)} {...(testId !== "" ? { "data-testid": testId } : {})} {...passThroughProps}>
      <Button type="button" variant="secondary" onClick={onClickBack} className="mb-4">
        <Icon size="small" variant="chevronLeft" className="mr-2" /> Back to Recaps
      </Button>
      <div>{children}</div>
    </header>
  );
};

interface HeaderTitleProps extends CommonProps {
  onClickAdd?: () => void;
  children: React.ReactNode;
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({
  onClickAdd,
  children,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  return (
    <div
      className={cn("flex", "justify-between", "w-full", className)}
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      <Heading variant="h2">{children}</Heading>

      {onClickAdd && (
        <Button type="button" variant="primary" onClick={onClickAdd}>
          Add a Recap
        </Button>
      )}
    </div>
  );
};

interface HeaderDescriptionProps extends CommonProps {
  children: React.ReactNode;
}

const HeaderDescription: React.FC<HeaderDescriptionProps> = ({
  children,
  testId = "",
  className = "",
  ...passThroughProps
}) => {
  return (
    <Text variant="p" className={className} testId={testId} {...passThroughProps}>
      {children}
    </Text>
  );
};

interface ContentProps extends CommonProps {
  children: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children, testId = "", className = "", ...passThroughProps }) => {
  return (
    <section className={cn(className)} {...(testId !== "" ? { "data-testid": testId } : {})} {...passThroughProps}>
      {children}
    </section>
  );
};

export interface RecapLayoutProps extends CommonProps {
  onGoBackToLanding: () => void;
  onCreateRecapSuccess: (createdRecap: Recap) => void;
  onUpdateRecapSuccess: (updatedRecap: Recap) => void;
  onDeleteRecapSuccess: (recapId: string) => void;
}

export { Container, Header, HeaderTitle, HeaderDescription, Content };
