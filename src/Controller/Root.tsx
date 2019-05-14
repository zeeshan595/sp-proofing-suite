import { combineReducers } from "redux";
import NavigationReducer, { INavigationState } from "./Navigation/Reducer";
import DeploymentReducer, { IDeploymentState } from "./Deployment/Reducer";
import AuthenticationReducer, { IAuthenticationState } from "./Authentication/Reducer";

export type RootState = {
  Navigation: INavigationState,
  Deployment: IDeploymentState,
  Authentication: IAuthenticationState
};

export const RootReducer = combineReducers({
  Navigation: NavigationReducer,
  Deployment: DeploymentReducer,
  Authentication: AuthenticationReducer
});