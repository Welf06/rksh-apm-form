import firebase_app from "../config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebase_app);
export default async function login(email, password) {
   let user = null;
   let errorMessage = null;
   let errorCode = null;
   const login = await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
         // Signed in 
         console.log("Logging In Successful")
         user = userCredential.user;
         // ...
      })
      .catch((error) => {
         errorCode = error.code;
         errorMessage = error.message;
         console.log("Logging In Failed", errorCode,"\n", errorMessage, )
      });
      return {user, errorCode, errorMessage}
}