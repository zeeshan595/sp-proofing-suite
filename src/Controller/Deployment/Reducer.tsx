import IDeployment from "../../Model/Deployment";
import {
  CREATE_DEPLOYMENT_SUCCESS,
  CREATE_DEPLOYMENT_FAIL,
  CREATE_DEPLOYMENT
} from "./Actions/CreateDeployment";
import {
  FETCH_DEPLOYMENT_LIST,
  FETCH_DEPLOYMENT_LIST_SUCCESS,
  FETCH_DEPLOYMENT_LIST_FAIL
} from "./Actions/FetchDeploymentList"

export interface IDeploymentState {
  Deployments: IDeployment[];
  Loading: boolean;
}

export const defaultState: IDeploymentState = {
  Deployments: [],
  Loading: false
};

export default (state: IDeploymentState = defaultState, action: any): IDeploymentState => {
  switch (action.type) {
    case FETCH_DEPLOYMENT_LIST_SUCCESS:
      state = {
        ...state,
        Loading: false,
        Deployments: action.payload.Deployments
      }
      break;
    case CREATE_DEPLOYMENT_SUCCESS:
      state = {
        ...state,
        Loading: false,
        Deployments: [
          ...state.Deployments,
          action.payload
        ]
      }
      break;

    case FETCH_DEPLOYMENT_LIST:
    case CREATE_DEPLOYMENT:
      state = {
        ...state,
        Loading: true
      };
      break;
    case FETCH_DEPLOYMENT_LIST_FAIL:
    case CREATE_DEPLOYMENT_FAIL:
      console.log(action.payload);
      state = {
        ...state,
        Loading: false
      };
      break;
  }

  return state;
};