import * as functions from 'firebase-functions';
import * as cors from "cors";

const corsHandler = cors({ origin: true });

export default functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    res.status(200).send({
      Deployments: [
        {
          Identifier: 2343,
          Name: "Hello World",
          List: 1324,
          TotalRecords: 24
        }
      ]
    });
  });
});