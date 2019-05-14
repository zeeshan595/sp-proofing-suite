import WebApi, { firebaseApi, alterianApi, documentToJson } from "../../WebApi";
import Token from "../../AlterianToken";

export const CREATE_DEPLOYMENT = "CREATE_DEPLOYMENT";
export const CREATE_DEPLOYMENT_SUCCESS = "CREATE_DEPLOYMENT_SUCCESS";
export const CREATE_DEPLOYMENT_FAIL = "CREATE_DEPLOYMENT_FAIL";
let isCreatingDeployment = false;
export const createDeployment = (name: string, deployment: number) => {
  if (isCreatingDeployment) return;
  return dispatch => {
    new Promise(async (resolve, reject) => {
      isCreatingDeployment = true;
      dispatch({
        type: CREATE_DEPLOYMENT
      });

      //ALTERIAN XML SOAP REQUEST :c
      const alterianData = '<?xml version="1.0" encoding="utf-8"?>' +
      '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
      "<soap:Body>" +
      '<GetDeploymentLists xmlns="DMWebServices">' +
      "<Token>" +
      Token +
      "</Token>" +
      "<DeploymentID>" +
      deployment +
      "</DeploymentID>" +
      "</GetDeploymentLists>" +
      "</soap:Body>" +
      "</soap:Envelope>";
      const alterianXhr = await WebApi("POST", alterianApi + "sendmessage.asmx", "XML", alterianData);
      if (alterianXhr.status != 200) {
        dispatch({
          type: CREATE_DEPLOYMENT_FAIL,
          payload: alterianXhr.response
        });
        isCreatingDeployment = false;
        reject();
        return;
      }
      const alterianResponse = JSON.parse(documentToJson(alterianXhr.response));
      const listIdentifier =
        alterianResponse["soap:Envelope"]["soap:Body"][
        "GetDeploymentListsResponse"
        ]["GetDeploymentListsResult"]["DMList"]["ID"]["_text"];
      const totalRecords =
        alterianResponse["soap:Envelope"]["soap:Body"][
        "GetDeploymentListsResponse"
        ]["GetDeploymentListsResult"]["DMList"]["RecordCount"]["_text"];

      //Firebase REST Request
      const xhr = await WebApi("POST", firebaseApi + "CreateDeployment", "JSON", {
        Name: name,
        Identifier: deployment,
        List: listIdentifier,
        TotalRecords: totalRecords
      });
      if (xhr.status != 200) {
        dispatch({
          type: CREATE_DEPLOYMENT_FAIL,
          payload: xhr.response
        });
        isCreatingDeployment = false;
        reject();
        return;
      }
      dispatch({
        type: CREATE_DEPLOYMENT_SUCCESS,
        payload: {
          Name: name,
          Identifier: deployment,
          List: listIdentifier,
          TotalRecords: totalRecords
        }
      });
      isCreatingDeployment = false;
      resolve();
    });
  };
};