import React from "react";
import Heading from "../../components/Heading";
import Text from "../../components/Text";

/*
  State Management:
  - page provider - useContext, useReducer
    {
      currentView: "All" | RecapKind
      recaps: {
        all: [],
        workExperience: [],
        education: [],
        accomplishments: [], 
        organizations: [],
        skills: [],
        sideProjects: [],
        publications: [],
        references: [],
        other: [],
      },
      isFetchingRecaps: false,
      isFetchRecapsError: false,
    }
  - fetch all recaps
    -> success
      - parse out into each recap kind
      - show recap list cards with counts on them
    -> failure
      - show error card
  - list cards
    -> click on card add/create button

  
  <RecapsPage>
    <LandingCardsLayout />

    <AllRecapsLayout /> -> <RecapLayout />
    <WorkExperienceLayout />
    <EducationLayout />
    <AccomplishmentsLayout />
    <OrganizationsLayout />
    <SkillsLayout>
    </SkillsLayout>
    <SideProjectsLayout>
      <CreateSuccessBanner />
      <CreateFailureBanner />
      <EditSuccessBanner />
      <EditFailureBanner />
      <DeleteSuccessBanner />
      <DeleteFailureBanner />

      <SideProjectsCreateModal />
      <SideProjectsEditModal />
    </SideProjectsLayout>
    <PublicationsLayout />
    <ReferencesLayout />
    <OtherLayout />
  </RecapsPage>
*/

const RecapsPage = () => {
  return (
    <div data-testid="recapsPage">
      <Heading variant="h2" className="p-6">
        Recaps
      </Heading>
      <Text variant="p">
        Remember all your personal wins, career highlights, and anything you are proud of. Jot it down and recap it
        later for when you may need to talk about yourself in like a resume, CV, website, or autobiography.
      </Text>
    </div>
  );
};

export default RecapsPage;
