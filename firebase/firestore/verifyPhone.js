import firebase_app from "../config";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function  verifyPhone(phoneNum) {
   try {
      window.recaptchaVerifier = new RecaptchaVerifier(
         "verify-phone",
         {
            size: 'invisible',
            callback: async (response) => {
               console.log("cum")
               // reCAPTCHA solved, allow signInWithPhoneNumber.
               // ...
            },
            'expired-callback': (response) => {
               // Response expired. Ask user to solve reCAPTCHA again.
               // ...
               console.log('reset captcha');
               grecaptcha.reset(window.recaptchaWidgetId);
            },
         },
         auth
      );
   } catch (e) {
      console.log('verifier setup error');
      console.log(e);
   }
   const appVerifier = window.recaptchaVerifier;
   let error = null;
   let result = null;
   console.log(phoneNum)
   const confirmationResult = await signInWithPhoneNumber(auth, phoneNum, appVerifier)
      .then((res) => {
         console.log('should received SMS now');
         console.log('confirmationResult');
         console.log(res);
         window.confirmationResult = res;
         result = true;

      })
      .catch((err) => {
         console.log('Error; SMS not sent');
         console.log(err.message);
         grecaptcha.reset(window.recaptchaVerifier);
         error = err.message;
         // Error; SMS not sent
         // ...
      })
      .finally(() => {
         window.document.querySelector('#recaptcha-container');
      })
      ;
      return { result, error };
}
