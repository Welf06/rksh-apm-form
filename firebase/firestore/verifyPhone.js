import firebase_app from "../config";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth(firebase_app);

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

export default async function  verifyPhone(phoneNum) {

   const appVerifier = window.recaptchaVerifier;
   let error = null;
   let result = null;
   let res = await signInWithPhoneNumber(auth, phoneNum, appVerifier)
      .then((confirmationResult) => {
         // SMS sent. Prompt user to type the code from the message, then sign the
         // user in with confirmationResult.confirm(code).
         console.log('should received SMS now');
         console.log('confirmationResult');
         console.log(confirmationResult);
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
   const onSendCode = async (phoneNumber) => {
      // get captcha object
      const appVerifier = window.recaptchaVerifier;

      try {
         const confirmationResult = await signInWithPhoneNumber(
            phoneNumber,
            appVerifier
         );
         // save auth result
         window.confirmationResult = confirmationResult;
      } catch (err) {
         if (window.captchaWidgetId) {
            window.grecaptcha.reset(window.captchaWidgetId);
         } else {
            window.recaptchaVerifier
               .render()
               .then(function (widgetId) {
                  window.captchaWidgetId = widgetId;
                  window.grecaptcha.reset(widgetId);
               })
               .catch((err) => {
                  // ...
               });
         }
      }
   };
   // onSendCode(phoneNum);
   // const phoneProvider = new auth.PhoneAuthProvider();
   // return phoneProvider.verifyPhoneNumber(phoneNum, recaptchaVerifier);
}
