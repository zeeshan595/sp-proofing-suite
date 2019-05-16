import * as firebase from "firebase/app"

export default async (): Promise<string> => {
  const query = await firebase.
    app().
    firestore().
    collection("Settings").
    doc("Alterian").get();

  if (!query.exists) return null;
  const data = query.data();
  return data["Token"];
};