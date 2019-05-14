import WebApi, { firebaseApi, } from "../../WebApi";

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

      const xhr = await WebApi("GET", firebaseApi + "GetDeployments", "JSON", null);
      if (xhr.status != 200) {
        dispatch({
          type: FETCH_DEPLOYMENT_LIST_FAIL,
          payload: xhr.response
        });
        isFetchingDeploymentList = false;
        reject();
        return;
      }
      const response = xhr.response;
      dispatch({
        type: FETCH_DEPLOYMENT_LIST_SUCCESS,
        payload: JSON.parse(response)
      });
      isFetchingDeploymentList = false;
      resolve();
    });
  }
};