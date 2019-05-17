import * as firebase from "firebase/app";
import RecordStatus from "../../../Model/RecordStatus";

export const UPDATE_RECORD_STATUS = "UPDATE_RECORD_STATUS";
export const UPDATE_RECORD_STATUS_FAIL = "UPDATE_RECORD_STATUS_FAIL";
export const UPDATE_RECORD_STATUS_SUCCESS = "UPDATE_RECORD_STATUS_SUCCESS";
let isUpdatingRecordStatus = false;
export const updateRecordStatus = (deployment: number, record: number, status: RecordStatus) => {
  if (isUpdatingRecordStatus) return;
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      isUpdatingRecordStatus = true;
      try {
        dispatch({
          type: UPDATE_RECORD_STATUS
        });
        await firebase.
          app().
          firestore().
          collection("Deployments").
          doc(deployment.toString()).
          collection("Records").
          doc(record.toString()).
          set({
            Status: status
          }, {
              merge: true
            });
        dispatch({
          type: UPDATE_RECORD_STATUS_SUCCESS
        });
        isUpdatingRecordStatus = false;
        resolve();
      } catch (e) {
        dispatch({
          type: UPDATE_RECORD_STATUS_FAIL,
          payload: e
        });
        isUpdatingRecordStatus = false;
        reject();
      }
    });
  }
}