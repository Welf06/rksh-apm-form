import { collection, getDocs, getFirestore } from "firebase/firestore";
import firebase_app from "../config";

export default async function getAllDocuments(collectionName, id) {
   const db = getFirestore(firebase_app)
   const querySnapshot = await getDocs(collection(db, "formData"));

   const data = [];
   querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      data.push(doc.data());
   });
   console.log("Got the documents")
   // console.log(data)
   return data;
}
