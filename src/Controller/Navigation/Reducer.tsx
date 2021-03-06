import { Action } from "redux";
import INavigation from "../../Model/Navigation";
import Homepage from "../../View/Homepage/Homepage.connect";
import NewDeployment from "../../View/NewDeployment/NewDeployment.connect";
import Deployment from "../../View/Deployment/Deployment.connect";
import Record from "../../View/Record/Record.connect";
import BuildPDF from "../../View/BuildPDF/BuildPDF.connect";

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
    },
    {
      Path: "/deployment/:deployment",
      Component: Deployment,
      exact: true
    },
    {
      Path: "/record/:deployment/:record",
      Component: Record,
      exact: true
    },
    {
      Path: "/pdf/:deployment/",
      Component: BuildPDF,
      exact: true
    }
  ]
};

export default (state: INavigationState = defaultState, action: Action): INavigationState => {
  return state;
};