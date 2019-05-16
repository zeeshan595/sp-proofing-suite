import TokenCreator from "../../AlterianToken";
import WebApi, { alterianApi, documentToJson } from "../../WebApi";

export const GET_PREVIEW_CODE = "GET_PREVIEW_CODE";
export const GET_PREVIEW_CODE_SUCCESS = "GET_PREVIEW_CODE_SUCCESS";
export const GET_PREVIEW_CODE_FAIL = "GET_PREVIEW_CODE_FAIL";
let isGettingPreviewCode = false;
export const getPreviewCode = (deployment: number, record: number, list: number) => {
  if (isGettingPreviewCode) return;
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      isGettingPreviewCode = true;
      dispatch({
        type: GET_PREVIEW_CODE
      });
      const token = await TokenCreator();
      try {
        //Get Preview Totals (need to call this before we can generate a preview)
        const previewTotalsData =
          '<?xml version="1.0" encoding="utf-8"?>' +
          '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
          "<soap:Body>" +
          '<PreviewDeploymentTotal xmlns="DMWebServices">' +
          "<Token>" +
          token +
          "</Token>" +
          "<DeploymentID>" +
          deployment +
          "</DeploymentID>" +
          "<RecipientLists>" +
          "<int>" + list + "</int>" +
          "</RecipientLists>" +
          "<SuppressionLists>" + "</SuppressionLists>" +
          "<SuppressEvents />" +
          "</PreviewDeploymentTotal>" +
          "</soap:Body>" +
          "</soap:Envelope>";
        const previewTotalXhr = await WebApi("POST", alterianApi + "sendmessage.asmx", "XML", previewTotalsData);
        if (previewTotalXhr.status != 200) {
          throw Error("Preview total was unsuccessful from alterian :c");
        }
        //Get Preview token
        const previewData =
          '<?xml version="1.0" encoding="utf-8"?>' +
          '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
          "<soap:Body>" +
          '<SAMPreviewEx xmlns="DMWebServices">' +
          "<Token>" +
          token +
          "</Token>" +
          "<DeploymentID>" +
          deployment +
          "</DeploymentID>" +
          "<RecordNumber>" +
          record +
          "</RecordNumber>" +
          "</SAMPreviewEx>" +
          "</soap:Body>" +
          "</soap:Envelope>";
        const previewXhr = await WebApi("POST", alterianApi + "sendmessage.asmx", "XML", previewData);
        if (previewXhr.status != 200) {
          throw Error("Could not get preview token from alterian :c");
        }
        const response = JSON.parse(documentToJson(previewXhr.response));
        const previewKey =
          response["soap:Envelope"]["soap:Body"]["SAMPreviewExResponse"][
          "SAMPreviewExResult"
          ]["_text"];
        if (!previewKey) {
          throw Error("Alterian returned an invalid preview key :c");
        }
        dispatch({
          type: GET_PREVIEW_CODE_SUCCESS,
          payload: previewKey
        });
        resolve();
      } catch (e) {
        dispatch({
          type: GET_PREVIEW_CODE_FAIL,
          payload: e
        });
        isGettingPreviewCode = false;
        reject();
      }
    });
  }
}