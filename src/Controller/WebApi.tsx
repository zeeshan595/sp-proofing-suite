import { json2xml, xml2json, js2xml, xml2js, ElementCompact } from "xml-js";

export const firebaseApi = "https://us-central1-sp-proofing-suite.cloudfunctions.net/";
export const alterianApi = "http://scottishpower.e.alterian.net/";

export default (method: "GET" | "POST", url: string, dataType: "JSON" | "XML", data: any): Promise<XMLHttpRequest> => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        if (!xhr) {
            reject("Failed to create XML Http request!");
            return;
        }
        xhr.onload = function () {
            resolve(xhr);
        }
        xhr.onerror = function () {
            reject(xhr);
        }
        if (dataType == "JSON") {
            xhr.setRequestHeader('Content-Type', 'application/json');
        } else if (dataType == "XML") {
            xhr.setRequestHeader('Content-Type', 'text/xml');
        }
        xhr.send(JSON.stringify(data));
    });
};

export const documentToJson = (document: string) => {
    return xml2json(document, { compact: true, spaces: 4 });
};

export const jsonToDocument = (json: string) => {
    return json2xml(json, { compact: true, spaces: 4 });
};

export const documentToJs = (document: string): Element | ElementCompact => {
    return xml2js(document, { compact: true });
};

export const jsToDocument = (element: Element) => {
    return js2xml(element, { compact: true });
};