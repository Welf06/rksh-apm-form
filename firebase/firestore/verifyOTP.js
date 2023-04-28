import firebase_app from "../config";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth(firebase_app);
export default async function verifyOTP(otp) {
   console.log(window.confirmationResult);
   const confirmationResult = window.confirmationResult;
   let error = null;
   let result = null;
   let userVerification = await confirmationResult
      .confirm(otp)
      .then((res) => {
         console.log('OTP confirmed');
         // console.log(res);
         result = res;
      }
      )
      .catch((err) => {
         console.log('OTP not confirmed');
         console.log(err.message);
         error = err.message;
      })
      ;
   return { result, error };
}