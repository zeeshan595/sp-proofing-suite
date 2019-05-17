import * as firebase from "firebase/app";

export const UPDATE_RECORD_COMMENT = "UPDATE_RECORD_COMMENT";
export const UPDATE_RECORD_COMMENT_FAIL = "UPDATE_RECORD_COMMENT_FAIL";
export const UPDATE_RECORD_COMMENT_SUCCESS = "UPDATE_RECORD_COMMENT_SUCCESS";
let isUpdatingRecordComment = false;
export const updateRecordComment = (deployment: number, record: number, comment: string) => {
  if (isUpdatingRecordComment) return;
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      isUpdatingRecordComment = true;
      try {
        dispatch({
          type: UPDATE_RECORD_COMMENT
        })
        await firebase.
          app().
          firestore().
          collection("Deployments").
          doc(deployment.toString()).
          collection("Records").
          doc(record.toString()).
          set({
            Comment: comment
          }, {
              merge: true
            });
        dispatch({
          type: UPDATE_RECORD_COMMENT_SUCCESS
        });
        isUpdatingRecordComment = false;
        resolve();
      } catch (e) {
        dispatch({
          type: UPDATE_RECORD_COMMENT_FAIL,
          payload: e
        });
        isUpdatingRecordComment = false;
        reject();
      }
    });
  }
}