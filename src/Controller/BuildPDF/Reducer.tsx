import { BUILD_PDF, BUILD_PDF_FAIL, BUILD_PDF_SUCCESS, BUILD_PDF_UPDATE } from "./Actions/buildPDF";


export interface IBuildPDFState {
  Progress: number;
  Loading: boolean;
  PreviewContent: string[];
}

export const DefaultState: IBuildPDFState = {
  Progress: 0,
  Loading: false,
  PreviewContent: []
};


export default (state: IBuildPDFState = DefaultState, action: any): IBuildPDFState => {
  switch (action.type) {
    case BUILD_PDF:
      state = {
        ...state,
        Loading: true,
        Progress: 0
      };
      break;
    case BUILD_PDF_FAIL:
      state = {
        ...state,
        Loading: false
      };
      break;
    case BUILD_PDF_SUCCESS:
      state = {
        ...state,
        Loading: false,
        PreviewContent: action.payload
      };
      break;
    case BUILD_PDF_UPDATE:
      state = {
        ...state,
        Loading: true,
        Progress: action.payload
      };
      break;
  }

  return state;
}