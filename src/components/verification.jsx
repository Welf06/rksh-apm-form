import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '@/styles/Form.module.css'
import OTPInput, { ResendOTP } from "otp-input-react";
import dynamic from 'next/dynamic'
 
const VerificationPage = ({setPage}) => {
   const [OTP, setOTP] = useState("");
   const [isResendDisabled, setIsResendDisabled] = useState(false);
   
   const renderButton = (buttonProps) => {
      return <button className={!isResendDisabled? styles.resendButtonDisabled : styles.resendButton}{...buttonProps}>Resend OTP</button>;
   };
   const renderTime = (remainingtime) => {
      return <button className={styles.resendTime}> 
      {remainingtime === 0 ? "" : `in ${remainingtime} seconds`}
      </button>;
   };

   const handleForm = (e) => {
      e.preventDefault();
      console.log(OTP);
   }

   return (
      <main className={`${styles.main}`}>
         <form className={styles.otpForm} onSubmit={handleForm}>
            <div className={styles.otpHeading}>Please Enter the OTP</div>
            <div className={styles.formGroup}>

            </div>
            <div className={styles.formGroup}>
               <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false}
                  style={{ maxWidth: "20rem" }}
                  inputStyles={{
                     margin: "0.5rem 0.5rem",
                     padding: "0.5rem 0.5rem", fontSize: "1.5rem", borderRadius: 4, border: "1px solid rgba(0,0,0,0.3)", background: "white", color: "black"
                  }}
               />
               <ResendOTP renderButton={renderButton} renderTime={renderTime} onTimerComplete={() => setIsResendDisabled(true)} isResendDisabled={isResendDisabled}
               onResendClick={() => {
                  setIsResendDisabled(false);
                  console.log("Resend clicked");
               }}
                  style={{
                     display: 'flex',
                     justifyContent: "left",
                     alignItems: "center",
                     maxWidth: "18rem",
                     flexDirection: "row-reverse",
                     gap: "0.25rem",
                     paddingLeft: "0.5rem",
                     marginTop: "0.5rem",
                  }} />
            </div>
            <div className={styles.formGroup}>
               <button className={styles.submitButton} type="submit">Verify Phone Number</button>
            </div>
         </form>
      </main>
   );
};

export default VerificationPage;
