import WebApi, { alterianApi, documentToJson } from "../../WebApi";
import TokenCreator from "../../AlterianToken";
import * as JsPdf from "jspdf";
import * as Html2Canvas from "html2canvas";

export const BUILD_PDF = "BUILD_PDF";
export const BUILD_PDF_UPDATE = "BUILD_PDF_UPDATE";
export const BUILD_PDF_SUCCESS = "BUILD_PDF_SCCESS";
export const BUILD_PDF_FAIL = "BUILD_PDF_FAIL";
let isBuildingPdf = false;
export const buildPdf = (
  deployment: number,
  list: number,
  totalRecords: number
) => {
  if (isBuildingPdf) return;
  return dispatch => {
    return new Promise(async (resolve, reject) => {
      isBuildingPdf = true;
      dispatch({
        type: BUILD_PDF
      });
      try {
        const previewContent: string[] = [];
        for (let i: number = 1; i < (parseInt(totalRecords.toString()) + 1); i++) {
          previewContent.push(await fetchPreviewContent(
            deployment,
            list,
            i
          ));
          dispatch({
            type: BUILD_PDF_UPDATE,
            payload: (i / totalRecords) * 100
          });
        }
        dispatch({
          type: BUILD_PDF_SUCCESS,
          payload: previewContent
        })
        isBuildingPdf = false;
        resolve();
      } catch (e) {
        dispatch({
          type: BUILD_PDF_FAIL,
          payload: e
        });
        isBuildingPdf = false;
        reject();
      }
    });
  }
}

const fetchPreviewContent = async (
  deployment: number,
  list: number,
  record: number
): Promise<string> => {
  const token = await TokenCreator();
  try {
    //Alterian needs this before we can get preview key
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
    //Get Preview Key
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
    
    //Use the preview key to get preview content
    const preview = await WebApi("GET", "https://images.scottishpower.co.uk/?" + previewKey, "JSON", null);  
    return preview.responseText;
  } catch (e) {
    console.log(e);
  }
  return null;
}