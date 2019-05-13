import * as functions from 'firebase-functions';
import * as cors from "cors";

const corsHandler = cors({ origin: true });

export default functions.https.onRequest((req, res) => {
  corsHandler(req, res, () => {
    res.status(200).send("Deployment Created");
  });
});