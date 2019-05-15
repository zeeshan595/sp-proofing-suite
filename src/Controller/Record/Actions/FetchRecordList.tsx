import * as firebase from "firebase/app";
import IRecord from "../../../Model/Record";

export const FETCH_RECORD_LIST = "FETCH_RECORD_LIST";
export const FETCH_RECORD_LIST_SUCCESS = "FETCH_RECORD_LIST_SUCCESS";
export const FETCH_RECORD_LIST_FAIL = "FETCH_RECORD_LIST_FAIL";
let isFetchedRecordList = false;
export const fetchRecordList = (deployment: number) => {
  if (isFetchedRecordList) return;
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      isFetchedRecordList = true;
      try {
        const query = await firebase.
          app().
          firestore().
          collection("Deployments").
          doc(deployment.toString()).
          collection("Records").
          get();

        const records: IRecord[] = [];
        for (let i = 0; i < query.docs.length; i++) {
          const data = query.docs[i].data();
          records.push({
            Identifier: parseInt(query.docs[i].id),
            Status: data.Status,
            Comment: data.Comment
          });
        }

        dispatch({
          type: FETCH_RECORD_LIST_SUCCESS,
          payload: {
            Records: records
          }
        });
        isFetchedRecordList = false;
        resolve();
      } catch (e) {
        dispatch({
          type: FETCH_RECORD_LIST_FAIL,
          payload: e
        });
        isFetchedRecordList = false;
        reject();
      }
    });
  }
}