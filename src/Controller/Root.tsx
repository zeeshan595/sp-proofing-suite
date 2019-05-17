import { combineReducers } from "redux";
import NavigationReducer, { INavigationState } from "./Navigation/Reducer";
import DeploymentReducer, { IDeploymentState } from "./Deployment/Reducer";
import AuthenticationReducer, { IAuthenticationState } from "./Authentication/Reducer";
import RecordReducer, { IRecordState } from "./Record/Reducer";
import BuildPDFReducer, { IBuildPDFState } from "./BuildPDF/Reducer";

export type RootState = {
  Navigation: INavigationState,
  Deployment: IDeploymentState,
  Authentication: IAuthenticationState,
  Record: IRecordState,
  BuildPDF: IBuildPDFState
};

export const RootReducer = combineReducers({
  Navigation: NavigationReducer,
  Deployment: DeploymentReducer,
  Authentication: AuthenticationReducer,
  Record: RecordReducer,
  BuildPDF: BuildPDFReducer
});