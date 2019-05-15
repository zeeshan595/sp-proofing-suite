import * as firebase from "firebase/app"
import IDeployment from "../../../Model/Deployment";

export const FETCH_DEPLOYMENT_LIST = "FETCH_DEPLOYMENT_LIST";
export const FETCH_DEPLOYMENT_LIST_SUCCESS = "FETCH_DEPLOYMENT_LIST_SUCCESS";
export const FETCH_DEPLOYMENT_LIST_FAIL = "FETCH_DEPLOYMENT_LIST_FAIL";
let isFetchingDeploymentList = false;
export const fetchDeploymentList = () => {
  if (isFetchingDeploymentList) return;
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      isFetchingDeploymentList = true;
      dispatch({
        type: FETCH_DEPLOYMENT_LIST
      });

      try {
        const deployments = [] as IDeployment[];
        const query = await firebase.app().firestore().collection("Deployments").get();
        for (let i = 0; i < query.docs.length; i++) {
          const data = query.docs[i].data();
          deployments.push({
            Identifier: data.Identifier,
            List: data.List,
            Name: data.Name,
            TotalRecords: data.TotalRecords
          });
        }
        dispatch({
          type: FETCH_DEPLOYMENT_LIST_SUCCESS,
          payload: {
            Deployments: deployments
          }
        });
        isFetchingDeploymentList = false;
        resolve();
      } catch (e) {
        dispatch({
          type: FETCH_DEPLOYMENT_LIST_FAIL,
          payload: e
        });
        isFetchingDeploymentList = false;
        reject();
      }
    });
  }
};