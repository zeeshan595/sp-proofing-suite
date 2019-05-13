import * as admin from 'firebase-admin';

//Functions
import GetDeployments from "./GetDeployments";
import CreateDeployment from "./CreateDeployment"

admin.initializeApp();
admin.auth();

export {
  GetDeployments,
  CreateDeployment
}