import IRecord from "../../Model/Record";
import { FETCH_RECORD_LIST, FETCH_RECORD_LIST_FAIL, FETCH_RECORD_LIST_SUCCESS } from "./Actions/FetchRecordList";

export interface IRecordState {
  Records: IRecord[]
  Loading: boolean;
}

export const defaultState: IRecordState = {
  Records: [],
  Loading: false
};

export default (state: IRecordState = defaultState, action: any): IRecordState => {
  switch (action.type) {
    case FETCH_RECORD_LIST:
      state = {
        ...state,
        Loading: true
      };
      break;
    case FETCH_RECORD_LIST_FAIL:
      state = {
        ...state,
        Loading: false
      };
      break;
    case FETCH_RECORD_LIST_SUCCESS:
      state = {
        ...state,
        Loading: false,
        Records: action.payload.Records
      };
      break;
  }
  return state;
};