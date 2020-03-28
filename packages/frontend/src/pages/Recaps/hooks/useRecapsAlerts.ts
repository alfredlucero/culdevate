import React, { useReducer } from "react";

export interface RecapsAlertsState {
  isShowingCreateSuccessAlert: boolean;
  isShowingCreateErrorAlert: boolean;
  isShowingUpdateSuccessAlert: boolean;
  isShowingUpdateErrorAlert: boolean;
  isShowingDeleteSuccessAlert: boolean;
  isShowingDeleteErrorAlert: boolean;
}

const initialRecapsAlertsState: RecapsAlertsState = {
  isShowingCreateSuccessAlert: false,
  isShowingCreateErrorAlert: false,
  isShowingUpdateSuccessAlert: false,
  isShowingUpdateErrorAlert: false,
  isShowingDeleteSuccessAlert: false,
  isShowingDeleteErrorAlert: false,
};

enum ActionTypes {
  ShowCreateSuccessAlert = "showCreateSuccessAlert",
  ShowCreateErrorAlert = "showCreateErrorAlert",
  ShowUpdateSuccessAlert = "showUpdateSuccessAlert",
  ShowUpdateErrorAlert = "showUpdateErrorAlert",
  ShowDeleteSuccessAlert = "showDeleteSuccessAlert",
  ShowDeleteErrorAlert = "showDeleteErrorAlert",
  HideAlert = "hideAlert",
}

type RecapsAlertsAction = {
  type: ActionTypes;
};

const reducer = (state: RecapsAlertsState, action: RecapsAlertsAction): RecapsAlertsState => {
  switch (action.type) {
    case ActionTypes.ShowCreateSuccessAlert:
      return {
        ...state,
        isShowingCreateSuccessAlert: true,
        isShowingCreateErrorAlert: false,
        isShowingUpdateSuccessAlert: false,
        isShowingUpdateErrorAlert: false,
        isShowingDeleteSuccessAlert: false,
        isShowingDeleteErrorAlert: false,
      };
    case ActionTypes.ShowCreateErrorAlert:
      return {
        ...state,
        isShowingCreateSuccessAlert: false,
        isShowingCreateErrorAlert: true,
        isShowingUpdateSuccessAlert: false,
        isShowingUpdateErrorAlert: false,
        isShowingDeleteSuccessAlert: false,
        isShowingDeleteErrorAlert: false,
      };
    case ActionTypes.ShowUpdateSuccessAlert:
      return {
        ...state,
        isShowingCreateSuccessAlert: false,
        isShowingCreateErrorAlert: false,
        isShowingUpdateSuccessAlert: true,
        isShowingUpdateErrorAlert: false,
        isShowingDeleteSuccessAlert: false,
        isShowingDeleteErrorAlert: false,
      };
    case ActionTypes.ShowUpdateErrorAlert:
      return {
        ...state,
        isShowingCreateSuccessAlert: false,
        isShowingCreateErrorAlert: false,
        isShowingUpdateSuccessAlert: false,
        isShowingUpdateErrorAlert: true,
        isShowingDeleteSuccessAlert: false,
        isShowingDeleteErrorAlert: false,
      };
    case ActionTypes.ShowDeleteSuccessAlert:
      return {
        ...state,
        isShowingCreateSuccessAlert: false,
        isShowingCreateErrorAlert: false,
        isShowingUpdateSuccessAlert: false,
        isShowingUpdateErrorAlert: false,
        isShowingDeleteSuccessAlert: true,
        isShowingDeleteErrorAlert: false,
      };
    case ActionTypes.ShowDeleteErrorAlert:
      return {
        ...state,
        isShowingCreateSuccessAlert: false,
        isShowingCreateErrorAlert: false,
        isShowingUpdateSuccessAlert: false,
        isShowingUpdateErrorAlert: false,
        isShowingDeleteSuccessAlert: false,
        isShowingDeleteErrorAlert: true,
      };
    case ActionTypes.HideAlert:
      return {
        ...state,
        isShowingCreateSuccessAlert: false,
        isShowingCreateErrorAlert: false,
        isShowingUpdateSuccessAlert: false,
        isShowingUpdateErrorAlert: false,
        isShowingDeleteSuccessAlert: false,
        isShowingDeleteErrorAlert: false,
      };
    default:
      return state;
  }
};

export interface UseRecapsAlerts {
  alertsState: RecapsAlertsState;
  showCreateSuccessAlert: () => void;
  showCreateErrorAlert: () => void;
  showUpdateSuccessAlert: () => void;
  showUpdateErrorAlert: () => void;
  showDeleteSuccessAlert: () => void;
  showDeleteErrorAlert: () => void;
  hideAlert: () => void;
}

export const useRecapsAlerts = (): UseRecapsAlerts => {
  const [alertsState, dispatch] = useReducer<React.Reducer<RecapsAlertsState, RecapsAlertsAction>>(
    reducer,
    initialRecapsAlertsState,
  );

  const showCreateSuccessAlert = () => {
    dispatch({ type: ActionTypes.ShowCreateSuccessAlert });
  };

  const showCreateErrorAlert = () => {
    dispatch({ type: ActionTypes.ShowCreateSuccessAlert });
  };

  const showUpdateSuccessAlert = () => {
    dispatch({ type: ActionTypes.ShowUpdateSuccessAlert });
  };

  const showUpdateErrorAlert = () => {
    dispatch({ type: ActionTypes.ShowUpdateSuccessAlert });
  };

  const showDeleteSuccessAlert = () => {
    dispatch({ type: ActionTypes.ShowDeleteSuccessAlert });
  };

  const showDeleteErrorAlert = () => {
    dispatch({ type: ActionTypes.ShowDeleteErrorAlert });
  };

  const hideAlert = () => {
    dispatch({ type: ActionTypes.HideAlert });
  };

  return {
    alertsState,
    showCreateSuccessAlert,
    showCreateErrorAlert,
    showUpdateSuccessAlert,
    showUpdateErrorAlert,
    showDeleteSuccessAlert,
    showDeleteErrorAlert,
    hideAlert,
  };
};
