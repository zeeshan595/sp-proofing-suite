import * as firebase from "firebase/app";

export const REMOVE_DEPLOYMENT = "REMOVE_DEPLOYMENT";
export const REMOVE_DEPLOYMENT_SUCCESS = "REMOVE_DEPLOYMENT_SUCCESS";
export const REMOVE_DEPLOYMENT_FAIL = "REMOVE_DEPLOYMENT_FAIL";
let isRemovedDeployment = false;
export const removeDeployment = (deployment: number) => {
  if (isRemovedDeployment) return;
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      dispatch({
        type: REMOVE_DEPLOYMENT
      });
      isRemovedDeployment = true;

      try {
        const deploymentRef = firebase.
          app().
          firestore().
          collection("Deployments").
          doc(deployment.toString());
        const query = await deploymentRef.collection("Records").get();
        for (let i = 0; i < query.docs.length; i++) {
          await query.docs[i].ref.delete();
        }
        await deploymentRef.delete();
        dispatch({
          type: REMOVE_DEPLOYMENT_SUCCESS,
          payload: deployment
        });
        isRemovedDeployment = false;
        resolve();
      } catch (e) {
        dispatch({
          type: REMOVE_DEPLOYMENT_FAIL,
          payload: e
        });
        isRemovedDeployment = false;
        reject();
      }
    });
  }
}