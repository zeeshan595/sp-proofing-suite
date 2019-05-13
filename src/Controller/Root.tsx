import { combineReducers } from "redux";
import NavigationReducer, { INavigationState } from "./Navigation/Reducer";
import DeploymentReducer, { IDeploymentState } from "./Deployment/Reducer";

export type RootState = {
  Navigation: INavigationState,
  Deployment: IDeploymentState
};

export const RootReducer = combineReducers({
  Navigation: NavigationReducer,
  Deployment: DeploymentReducer
});