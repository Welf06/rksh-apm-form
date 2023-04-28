import firebase_app from "../config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)
export default async function addData(colllection, id, data) {
    let result = null;
    let error = null;
    const res = await setDoc(doc(db, colllection, id), data, { merge: true, })
        .then(() => {
            console.log("Document successfully written!");
            result = true
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            result = false
            error = error
        });

    console.log(result, error)
    return { result, error };
}