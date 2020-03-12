import React from "react";
import cn from "classnames";
import Heading from "../../../../components/Heading";
import Button from "../../../../components/Button";
import Text from "../../../../components/Text";
import LoadingIcon from "../../../../components/LoadingIcon";
import RecapsErrorCard from "../RecapsErrorCard";
import AccomplishmentsListCard from "../Accomplishments/ListCard";
import EducationListCard from "../Education/ListCard";
import OrganizationsListCard from "../Organizations/ListCard";
import OtherListCard from "../Other/ListCard";
import PublicationsListCard from "../Publications/ListCard";
import ReferencesListCard from "../References/ListCard";
import SideProjectsListCard from "../SideProjects/ListCard";
import SkillsListCard from "../Skills/ListCard";
import WorkExperienceListCard from "../WorkExperience/ListCard";
import { RecapKind } from "../../recaps.interface";
import { CommonProps } from "../../../../components/commonProps";

export interface RecapLandingListCardsProps extends CommonProps {
  onRetryFetchRecaps: () => void;
  onGoToRecapKindLayout: (kindLayout: RecapKind | "all" | "landingListCards") => void;
  isFetchingRecaps: boolean;
  isFetchRecapsError: boolean;
}

const RecapLandingListCards: React.FC<RecapLandingListCardsProps> = ({
  onRetryFetchRecaps,
  onGoToRecapKindLayout,
  isFetchingRecaps,
  isFetchRecapsError,
  className = "",
  testId = "",
  ...passThroughProps
}) => {
  if (isFetchingRecaps) {
    return (
      <section
        className={cn(className, "h-screen", "flex", "flex-col")}
        {...(testId !== "" ? { "data-testid": testId } : {})}
        {...passThroughProps}
      >
        <header>
          <Heading variant="h2" className="mb-4">
            Recaps
          </Heading>

          <Text variant="p" className="lg:w-1/2">
            Start remembering all the things you did for your future self or employer. Click on one of the kind of
            recaps to view or add a new one!
          </Text>
        </header>
        <div className={cn("flex", "flex-1", "justify-center", "items-center", "flex-col")}>
          <LoadingIcon size="xlarge" />
          <Text variant="p">Recapping all the things you did...</Text>
        </div>
      </section>
    );
  }

  if (isFetchRecapsError) {
    return (
      <section
        className={cn(className, "h-screen")}
        {...(testId !== "" ? { "data-testid": testId } : {})}
        {...passThroughProps}
      >
        <header className="mb-6">
          <Heading variant="h2" className="mb-4">
            Recaps
          </Heading>

          <Text variant="p" className="lg:w-1/2">
            Start remembering all the things you did for your future self or employer. Click on one of the kind of
            recaps to view or add a new one!
          </Text>
        </header>

        <RecapsErrorCard onRetry={onRetryFetchRecaps} />
      </section>
    );
  }

  return (
    <section
      className={cn(className, "h-screen")}
      {...(testId !== "" ? { "data-testid": testId } : {})}
      {...passThroughProps}
    >
      <header className="mb-6">
        <div className={cn("flex", "mb-4")}>
          <Heading variant="h2" className="mr-4">
            Recaps
          </Heading>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              onGoToRecapKindLayout("all");
            }}
          >
            View All
          </Button>
        </div>

        <Text variant="p" className="lg:w-1/2">
          Start remembering all the things you did for your future self or employer. Click on one of the kind of recaps
          to view or add a new one!
        </Text>
      </header>

      <div className={cn("flex", "flex-wrap", "justify-around", "lg:w-3/4")}>
        <WorkExperienceListCard
          className="my-6"
          onClick={() => {
            onGoToRecapKindLayout("Work Experience");
          }}
        />

        <EducationListCard
          className="my-6"
          onClick={() => {
            onGoToRecapKindLayout("Education");
          }}
        />

        <AccomplishmentsListCard
          className="my-6"
          onClick={() => {
            onGoToRecapKindLayout("Accomplishments");
          }}
        />

        <SkillsListCard
          className="my-6"
          onClick={() => {
            onGoToRecapKindLayout("Skills");
          }}
        />

        <OrganizationsListCard
          className="my-6"
          onClick={() => {
            onGoToRecapKindLayout("Organizations");
          }}
        />

        <SideProjectsListCard
          className="my-6"
          onClick={() => {
            onGoToRecapKindLayout("Side Projects");
          }}
        />

        <PublicationsListCard
          className="my-6"
          onClick={() => {
            onGoToRecapKindLayout("Publications");
          }}
        />

        <ReferencesListCard
          className="my-6"
          onClick={() => {
            onGoToRecapKindLayout("References");
          }}
        />

        <OtherListCard
          className="my-6"
          onClick={() => {
            onGoToRecapKindLayout("Other");
          }}
        />
      </div>
    </section>
  );
};

export default RecapLandingListCards;
