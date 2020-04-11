import React, { useReducer } from "react";

export interface RecapsAlertsState {
  isShowingCreateSuccessAlert: boolean;
  isShowingUpdateSuccessAlert: boolean;
  isShowingDeleteSuccessAlert: boolean;
  isShowingDeleteErrorAlert: boolean;
}

const initialRecapsAlertsState: RecapsAlertsState = {
  isShowingCreateSuccessAlert: false,
  isShowingUpdateSuccessAlert: false,
  isShowingDeleteSuccessAlert: false,
  isShowingDeleteErrorAlert: false,
};

enum ActionTypes {
  ShowCreateSuccessAlert = "showCreateSuccessAlert",
  ShowUpdateSuccessAlert = "showUpdateSuccessAlert",
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
        isShowingUpdateSuccessAlert: false,
        isShowingDeleteSuccessAlert: false,
        isShowingDeleteErrorAlert: false,
      };
    case ActionTypes.ShowUpdateSuccessAlert:
      return {
        ...state,
        isShowingCreateSuccessAlert: false,
        isShowingUpdateSuccessAlert: true,
        isShowingDeleteSuccessAlert: false,
        isShowingDeleteErrorAlert: false,
      };
    case ActionTypes.ShowDeleteSuccessAlert:
      return {
        ...state,
        isShowingCreateSuccessAlert: false,
        isShowingUpdateSuccessAlert: false,
        isShowingDeleteSuccessAlert: true,
        isShowingDeleteErrorAlert: false,
      };
    case ActionTypes.ShowDeleteErrorAlert:
      return {
        ...state,
        isShowingCreateSuccessAlert: false,
        isShowingUpdateSuccessAlert: false,
        isShowingDeleteSuccessAlert: false,
        isShowingDeleteErrorAlert: true,
      };
    case ActionTypes.HideAlert:
      return {
        ...state,
        isShowingCreateSuccessAlert: false,
        isShowingUpdateSuccessAlert: false,
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
  showUpdateSuccessAlert: () => void;
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

  const showUpdateSuccessAlert = () => {
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
    showUpdateSuccessAlert,
    showDeleteSuccessAlert,
    showDeleteErrorAlert,
    hideAlert,
  };
};
