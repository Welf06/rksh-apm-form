import firebase_app from "../config";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function getDocument(collection, id) {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        const res = await getDoc(docRef);
        result = res.data();
    } catch (e) {
        error = e;
    }
    // console.log(result, error)
    return { result, error };
}
