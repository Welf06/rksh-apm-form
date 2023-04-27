import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);

// Check if a document with a specific ID exists in Firestore
export default async function documentExists(collection, id) {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);
  console.log(collection, id, docSnap.exists())
  return docSnap.exists();
}
