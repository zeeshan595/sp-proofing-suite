import IRecord from "../../Model/Record";
import { FETCH_RECORD_LIST, FETCH_RECORD_LIST_FAIL, FETCH_RECORD_LIST_SUCCESS } from "./Actions/FetchRecordList";
import { GET_PREVIEW_CODE, GET_PREVIEW_CODE_SUCCESS } from "./Actions/GetPreviewCode";
import { UPDATE_RECORD_COMMENT_FAIL, UPDATE_RECORD_COMMENT, UPDATE_RECORD_COMMENT_SUCCESS } from "./Actions/updateRecordComment";
import { UPDATE_RECORD_STATUS_FAIL, UPDATE_RECORD_STATUS, UPDATE_RECORD_STATUS_SUCCESS } from "./Actions/updateRecordStatus";

export interface IRecordState {
  Records: IRecord[];
  PreviewKey: string;
  Loading: boolean;
}

export const defaultState: IRecordState = {
  Records: [],
  PreviewKey: "",
  Loading: false
};

export default (state: IRecordState = defaultState, action: any): IRecordState => {
  switch (action.type) {
    case GET_PREVIEW_CODE:
    case FETCH_RECORD_LIST:
    case UPDATE_RECORD_COMMENT:
    case UPDATE_RECORD_STATUS:
      state = {
        ...state,
        Loading: true
      };
      break;
    case GET_PREVIEW_CODE:
    case FETCH_RECORD_LIST_FAIL:
    case UPDATE_RECORD_COMMENT_FAIL:
    case UPDATE_RECORD_STATUS_FAIL:
      state = {
        ...state,
        Loading: false
      };
      break;

    case UPDATE_RECORD_STATUS_SUCCESS:
    case UPDATE_RECORD_COMMENT_SUCCESS:
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
    case GET_PREVIEW_CODE_SUCCESS:
      state = {
        ...state,
        Loading: false,
        PreviewKey: action.payload
      };
      break;
  }
  return state;
};