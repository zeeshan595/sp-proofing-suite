import IDeployment from "../../Model/Deployment";
import {
  FETCH_DEPLOYMENT_LIST,
  FETCH_DEPLOYMENT_LIST_SUCCESS,
  FETCH_DEPLOYMENT_LIST_FAIL,
  CREATE_DEPLOYMENT_SUCCESS,
  CREATE_DEPLOYMENT_FAIL,
  CREATE_DEPLOYMENT
} from "./Actions";

export interface IDeploymentState {
  Deployments: IDeployment[]
}

export const defaultState: IDeploymentState = {
  Deployments: []
};

export default (state: IDeploymentState = defaultState, action: any): IDeploymentState => {
  switch (action.type) {
    case FETCH_DEPLOYMENT_LIST_SUCCESS:
      state = {
        ...state,
        Deployments: action.payload.Deployments
      }
      break;
    case CREATE_DEPLOYMENT_SUCCESS:
      state = {
        ...state,
        Deployments: [
          ...state.Deployments,
          action.payload
        ]
      }
      break;

    case FETCH_DEPLOYMENT_LIST:
    case FETCH_DEPLOYMENT_LIST_FAIL:
    case CREATE_DEPLOYMENT:
    case CREATE_DEPLOYMENT_FAIL:
      break;
  }

  return state;
};