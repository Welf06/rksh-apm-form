import firebase_app from "../config";
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore";

import documentExists from "./documentExists";
import getDocument from "./getDocument";

const db = getFirestore(firebase_app)

export default async function addData(col, id , data) {
    let result = null;
    let error = null;
    console.log("entered")
    const docRef = doc(collection(db, col));

    const res = await setDoc(docRef, data)
        .then(() => {
            console.log("Document successfully added");
            result = true
        })
        .catch((err) => {
            console.error("Error writing document: ", error);
            result = false
            error = err;
        });
    // console.log(result, error)
    return { result, error };
}
// export default async function addData(collection, id, data) {
//     let result = null;
//     let error = null;
//     const docExists = await documentExists(collection, id);
//     if (docExists){
//         const doc = await getDocument(collection, id);
//         const docData = doc.result;
//         const docError = doc.error;

//     }
//     else{
//     const res = await setDoc(doc(db, collection, id), data, { merge: true, })
//         .then(() => {
//             console.log("Document successfully written!");
//             result = true
//         })
//         .catch((err) => {
//             console.error("Error writing document: ", error);
//             result = false
//             error = err;
//         });
//     }
//     console.log(result, error)
//     return { result, error };
// }