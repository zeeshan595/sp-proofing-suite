import { Action } from "redux";
import INavigation from "../../Model/Navigation";
import Homepage from "../../View/Homepage/Homepage.connect";
import NewDeployment from "../../View/NewDeployment/NewDeployment.connect";

export interface INavigationState {
  Navigation: INavigation[]
}

export const defaultState: INavigationState = {
  Navigation: [
    {
      Path: "/",
      Component: Homepage,
      exact: true
    },
    {
      Path: "/new-deployment",
      Component: NewDeployment,
      exact: true
    }
  ]
};

export default (state: INavigationState = defaultState, action: Action): INavigationState => {
  return state;
};