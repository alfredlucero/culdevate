import React, { useState, useReducer, useEffect } from "react";
import cn from "classnames";
// Components
import Heading from "../../components/Heading";
import Text from "../../components/Text";
import LoadingIcon from "../../components/LoadingIcon";
import RecapsErrorCard from "./components/RecapsErrorCard";
import RecapLandingListCards from "./components/RecapLandingListCards";
import WorkExperienceLayout from "./components/WorkExperience/Layout";
import EducationLayout from "./components/Education/Layout";
import AccomplishmentsLayout from "./components/Accomplishments/Layout";
import OrganizationsLayout from "./components/Organizations/Layout";
import SkillsLayout from "./components/Skills/Layout";
import SideProjectsLayout from "./components/SideProjects/Layout";
import PublicationsLayout from "./components/Publications/Layout";
import ReferencesLayout from "./components/References/Layout";
import OtherLayout from "./components/Other/Layout";
// Services
import { getRecaps } from "./recaps.service";
// Types
import {
  RecapKind,
  RecapWorkExperience,
  RecapEducation,
  RecapAccomplishments,
  RecapOrganizations,
  RecapSkills,
  RecapSideProjects,
  RecapPublications,
  RecapReferences,
  RecapOther,
  Recap,
} from "./recaps.interface";

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

export type RecapsCurrentKindLayout = "landingListCards" | "all" | RecapKind;

interface RecapsPageState {
  isFetchingRecaps: boolean;
  isFetchRecapsError: boolean;
  recapsMap: RecapsMap;
}

interface RecapsMap {
  workExperience: RecapWorkExperience[];
  education: RecapEducation[];
  accomplishments: RecapAccomplishments[];
  organizations: RecapOrganizations[];
  skills: RecapSkills[];
  sideProjects: RecapSideProjects[];
  publications: RecapPublications[];
  references: RecapReferences[];
  other: RecapOther[];
}

const initialRecapsPageState: RecapsPageState = {
  isFetchingRecaps: false,
  isFetchRecapsError: false,
  recapsMap: {
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
};

enum ActionTypes {
  GetRecapsRequest = "getRecapsRequest",
  GetRecapsSuccess = "getRecapsSuccess",
  GetRecapsFailure = "getRecapsFailure",
  CreateRecapSuccess = "createRecapSuccess",
  UpdateRecapSuccess = "updateRecapSuccess",
  DeleteRecapSuccess = "deleteRecapSuccess",
}

type RecapsPageAction =
  | {
      type: ActionTypes.GetRecapsRequest;
    }
  | {
      type: ActionTypes.GetRecapsSuccess;
      payload: Recap[];
    }
  | {
      type: ActionTypes.GetRecapsFailure;
    }
  | {
      type: ActionTypes.CreateRecapSuccess;
      payload: Recap;
    }
  | {
      type: ActionTypes.UpdateRecapSuccess;
      payload: Recap;
    }
  | {
      type: ActionTypes.DeleteRecapSuccess;
      payload: Recap;
    };

const recapsAdapter = (recaps: Recap[]): RecapsMap => {
  const workExperience: RecapWorkExperience[] = [];
  const education: RecapEducation[] = [];
  const accomplishments: RecapAccomplishments[] = [];
  const organizations: RecapOrganizations[] = [];
  const skills: RecapSkills[] = [];
  const sideProjects: RecapSideProjects[] = [];
  const publications: RecapPublications[] = [];
  const references: RecapReferences[] = [];
  const other: RecapOther[] = [];

  recaps.forEach(recap => {
    switch (recap.kind) {
      case "Work Experience":
        workExperience.push(recap);
        break;
      case "Education":
        education.push(recap);
        break;
      case "Accomplishments":
        accomplishments.push(recap);
        break;
      case "Organizations":
        organizations.push(recap);
        break;
      case "Skills":
        skills.push(recap);
        break;
      case "Side Projects":
        sideProjects.push(recap);
        break;
      case "Publications":
        publications.push(recap);
        break;
      case "References":
        references.push(recap);
        break;
      case "Other":
        other.push(recap);
        break;
      default:
        console.error("Invalid recap kind for ", recap);
    }
  });

  const recapsMap = {
    workExperience,
    education,
    accomplishments,
    organizations,
    skills,
    sideProjects,
    publications,
    references,
    other,
  };

  // console.log(recapsMap);

  return recapsMap;
};

function createRecapForList<RecapType>(createdRecap: RecapType, recaps: RecapType[]): RecapType[] {
  return [...recaps, createdRecap];
}
function updateRecapInList(updatedRecap: Recap, recaps: Recap[]): Recap[] {
  return recaps.map(recap => {
    return recap._id === updatedRecap._id ? updatedRecap : recap;
  });
}
function deleteRecapFromList(deletedRecap: Recap, recaps: Recap[]): Recap[] {
  return recaps.filter(recap => (recap._id !== deletedRecap._id ? true : false));
}

const recapsPageReducer = (state: RecapsPageState, action: RecapsPageAction): RecapsPageState => {
  switch (action.type) {
    case ActionTypes.GetRecapsRequest: {
      return {
        ...state,
        isFetchingRecaps: true,
        isFetchRecapsError: false,
      };
    }
    case ActionTypes.GetRecapsSuccess: {
      const recapsMap = recapsAdapter(action.payload);

      return {
        ...state,
        recapsMap,
        isFetchingRecaps: false,
        isFetchRecapsError: false,
      };
    }
    case ActionTypes.GetRecapsFailure: {
      return {
        ...state,
        isFetchingRecaps: false,
        isFetchRecapsError: true,
      };
    }
    case ActionTypes.CreateRecapSuccess: {
      const createdRecap = action.payload;

      switch (createdRecap.kind) {
        case "Work Experience":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              workExperience: createRecapForList(createdRecap, state.recapsMap.workExperience),
            },
          };
        case "Education":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              education: createRecapForList(createdRecap, state.recapsMap.education),
            },
          };
        case "Accomplishments":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              accomplishments: createRecapForList(createdRecap, state.recapsMap.accomplishments),
            },
          };
        case "Organizations":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              organizations: createRecapForList(createdRecap, state.recapsMap.organizations),
            },
          };
        case "Skills":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              skills: createRecapForList(createdRecap, state.recapsMap.skills),
            },
          };
        case "Side Projects":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              sideProjects: createRecapForList(createdRecap, state.recapsMap.sideProjects),
            },
          };
        case "Publications":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              publications: createRecapForList(createdRecap, state.recapsMap.publications),
            },
          };
        case "References":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              references: createRecapForList(createdRecap, state.recapsMap.references),
            },
          };
        case "Other":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              other: createRecapForList(createdRecap, state.recapsMap.other),
            },
          };
        default:
          console.error("Invalid recap kind for ", createdRecap);
          return state;
      }
    }
    case ActionTypes.UpdateRecapSuccess: {
      const updatedRecap = action.payload;

      switch (updatedRecap.kind) {
        case "Work Experience":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              workExperience: updateRecapInList(updatedRecap, state.recapsMap.workExperience) as RecapWorkExperience[],
            },
          };
        case "Education":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              education: updateRecapInList(updatedRecap, state.recapsMap.education) as RecapEducation[],
            },
          };
        case "Accomplishments":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              accomplishments: updateRecapInList(
                updatedRecap,
                state.recapsMap.accomplishments,
              ) as RecapAccomplishments[],
            },
          };
        case "Organizations":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              organizations: updateRecapInList(updatedRecap, state.recapsMap.organizations) as RecapOrganizations[],
            },
          };
        case "Skills":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              skills: updateRecapInList(updatedRecap, state.recapsMap.skills) as RecapSkills[],
            },
          };
        case "Side Projects":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              sideProjects: updateRecapInList(updatedRecap, state.recapsMap.sideProjects) as RecapSideProjects[],
            },
          };
        case "Publications":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              publications: updateRecapInList(updatedRecap, state.recapsMap.publications) as RecapPublications[],
            },
          };
        case "References":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              references: updateRecapInList(updatedRecap, state.recapsMap.references) as RecapReferences[],
            },
          };
        case "Other":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              other: updateRecapInList(updatedRecap, state.recapsMap.other) as RecapOther[],
            },
          };
        default:
          console.error("Invalid recap kind for ", updatedRecap);
          return state;
      }
    }
    case ActionTypes.DeleteRecapSuccess: {
      const deletedRecap = action.payload;

      switch (deletedRecap.kind) {
        case "Work Experience":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              workExperience: deleteRecapFromList(
                deletedRecap,
                state.recapsMap.workExperience,
              ) as RecapWorkExperience[],
            },
          };
        case "Education":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              education: deleteRecapFromList(deletedRecap, state.recapsMap.education) as RecapEducation[],
            },
          };
        case "Accomplishments":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              accomplishments: deleteRecapFromList(
                deletedRecap,
                state.recapsMap.accomplishments,
              ) as RecapAccomplishments[],
            },
          };
        case "Organizations":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              organizations: deleteRecapFromList(deletedRecap, state.recapsMap.organizations) as RecapOrganizations[],
            },
          };
        case "Skills":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              skills: deleteRecapFromList(deletedRecap, state.recapsMap.skills) as RecapSkills[],
            },
          };
        case "Side Projects":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              sideProjects: deleteRecapFromList(deletedRecap, state.recapsMap.sideProjects) as RecapSideProjects[],
            },
          };
        case "Publications":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              publications: deleteRecapFromList(deletedRecap, state.recapsMap.publications) as RecapPublications[],
            },
          };
        case "References":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              references: deleteRecapFromList(deletedRecap, state.recapsMap.references) as RecapReferences[],
            },
          };
        case "Other":
          return {
            ...state,
            recapsMap: {
              ...state.recapsMap,
              other: deleteRecapFromList(deletedRecap, state.recapsMap.other) as RecapOther[],
            },
          };
        default:
          console.error("Invalid recap kind for ", deletedRecap);
          return state;
      }
    }
    default:
      return state;
  }
};

const RecapsPage = () => {
  const [currentKindLayout, setCurrentKindLayout] = useState<RecapsCurrentKindLayout>("landingListCards");
  const onGoToRecapKindLayout = (kindLayout: RecapsCurrentKindLayout) => {
    setCurrentKindLayout(kindLayout);
  };
  const onGoBackToLanding = () => {
    setCurrentKindLayout("landingListCards");
  };

  const [recapsPageState, dispatch] = useReducer<React.Reducer<RecapsPageState, RecapsPageAction>>(
    recapsPageReducer,
    initialRecapsPageState,
  );

  const { isFetchingRecaps, isFetchRecapsError, recapsMap } = recapsPageState;

  const fetchRecaps = () => {
    dispatch({
      type: ActionTypes.GetRecapsRequest,
    });
    getRecaps()
      .then(recaps => {
        dispatch({
          type: ActionTypes.GetRecapsSuccess,
          payload: recaps,
        });
      })
      .catch(() => {
        dispatch({
          type: ActionTypes.GetRecapsFailure,
        });
      });
  };

  useEffect(fetchRecaps, []);

  const onCreateRecapSuccess = (createdRecap: Recap) => {
    dispatch({ type: ActionTypes.CreateRecapSuccess, payload: createdRecap });
  };
  const onUpdateRecapSuccess = (updatedRecap: Recap) => {
    dispatch({ type: ActionTypes.UpdateRecapSuccess, payload: updatedRecap });
  };
  const onDeleteRecapSuccess = (deletedRecap: Recap) => {
    dispatch({ type: ActionTypes.DeleteRecapSuccess, payload: deletedRecap });
  };

  if (isFetchingRecaps) {
    return (
      <div data-testid="recapsPageLoading" className={cn("p-12", "h-screen", "flex", "flex-col")}>
        <header>
          <Heading variant="h2" className="mb-4">
            Recaps
          </Heading>
        </header>
        <div className={cn("flex", "flex-1", "justify-center", "items-center", "flex-col")}>
          <LoadingIcon size="xlarge" />
          <Text variant="p">Recapping all the things you did...</Text>
        </div>
      </div>
    );
  }

  if (isFetchRecapsError) {
    return (
      <div data-testid="recapsPageError" className={cn("p-12", "h-screen")}>
        <header className="mb-6">
          <Heading variant="h2" className="mb-4">
            Recaps
          </Heading>
        </header>

        <RecapsErrorCard onRetry={fetchRecaps} />
      </div>
    );
  }
  return (
    <div data-testid="recapsPage" className={cn("p-12", "h-screen", "flex", "flex-col")}>
      {currentKindLayout === "all" && <RecapLandingListCards onGoToRecapKindLayout={onGoToRecapKindLayout} />}

      {currentKindLayout === "landingListCards" && (
        <RecapLandingListCards onGoToRecapKindLayout={onGoToRecapKindLayout} />
      )}

      {currentKindLayout === "Work Experience" && (
        <WorkExperienceLayout
          recaps={recapsMap.workExperience}
          onGoBackToLanding={onGoBackToLanding}
          onCreateRecapSuccess={onCreateRecapSuccess}
          onUpdateRecapSuccess={onUpdateRecapSuccess}
          onDeleteRecapSuccess={onDeleteRecapSuccess}
        />
      )}

      {currentKindLayout === "Education" && (
        <EducationLayout
          recaps={recapsMap.education}
          onGoBackToLanding={onGoBackToLanding}
          onCreateRecapSuccess={onCreateRecapSuccess}
          onUpdateRecapSuccess={onUpdateRecapSuccess}
          onDeleteRecapSuccess={onDeleteRecapSuccess}
        />
      )}

      {currentKindLayout === "Accomplishments" && (
        <AccomplishmentsLayout
          recaps={recapsMap.accomplishments}
          onGoBackToLanding={onGoBackToLanding}
          onCreateRecapSuccess={onCreateRecapSuccess}
          onUpdateRecapSuccess={onUpdateRecapSuccess}
          onDeleteRecapSuccess={onDeleteRecapSuccess}
        />
      )}

      {currentKindLayout === "Organizations" && (
        <OrganizationsLayout
          recaps={recapsMap.organizations}
          onGoBackToLanding={onGoBackToLanding}
          onCreateRecapSuccess={onCreateRecapSuccess}
          onUpdateRecapSuccess={onUpdateRecapSuccess}
          onDeleteRecapSuccess={onDeleteRecapSuccess}
        />
      )}

      {currentKindLayout === "Skills" && (
        <SkillsLayout
          recaps={recapsMap.skills}
          onGoBackToLanding={onGoBackToLanding}
          onCreateRecapSuccess={onCreateRecapSuccess}
          onUpdateRecapSuccess={onUpdateRecapSuccess}
          onDeleteRecapSuccess={onDeleteRecapSuccess}
        />
      )}

      {currentKindLayout === "Side Projects" && (
        <SideProjectsLayout
          recaps={recapsMap.sideProjects}
          onGoBackToLanding={onGoBackToLanding}
          onCreateRecapSuccess={onCreateRecapSuccess}
          onUpdateRecapSuccess={onUpdateRecapSuccess}
          onDeleteRecapSuccess={onDeleteRecapSuccess}
        />
      )}

      {currentKindLayout === "Publications" && (
        <PublicationsLayout
          recaps={recapsMap.publications}
          onGoBackToLanding={onGoBackToLanding}
          onCreateRecapSuccess={onCreateRecapSuccess}
          onUpdateRecapSuccess={onUpdateRecapSuccess}
          onDeleteRecapSuccess={onDeleteRecapSuccess}
        />
      )}

      {currentKindLayout === "References" && (
        <ReferencesLayout
          recaps={recapsMap.references}
          onGoBackToLanding={onGoBackToLanding}
          onCreateRecapSuccess={onCreateRecapSuccess}
          onUpdateRecapSuccess={onUpdateRecapSuccess}
          onDeleteRecapSuccess={onDeleteRecapSuccess}
        />
      )}

      {currentKindLayout === "Other" && (
        <OtherLayout
          recaps={recapsMap.other}
          onGoBackToLanding={onGoBackToLanding}
          onCreateRecapSuccess={onCreateRecapSuccess}
          onUpdateRecapSuccess={onUpdateRecapSuccess}
          onDeleteRecapSuccess={onDeleteRecapSuccess}
        />
      )}
    </div>
  );
};

export default RecapsPage;
