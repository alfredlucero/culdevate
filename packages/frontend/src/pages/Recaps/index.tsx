import React from "react";
import Heading from "../../components/Heading";
import Text from "../../components/Text";

/*
  State Management:
  - page provider - useContext, useReducer
    {
      currentView: "all" | "landingListCards" | RecapKind
      recaps: {
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
  - landing list cards
    -> click on card to take you to recap kind layout
  - each layout container connects to page state
    - can go back to landing list cards view (resets banner states/modals too if necessary)
    - empty state (empty card has add button)
    - maintains state for banners
    - maintains its specific create/edit/delete modals
    - maintains its own kind's recap list -> may be ordered in specific way

  
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
