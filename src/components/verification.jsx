import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '@/styles/Form.module.css'
import OTPInput, { ResendOTP } from "otp-input-react";
import {BiArrowBack} from 'react-icons/bi'

import verifyOTP from '../../firebase/firestore/verifyOTP';
import addData from "../../firebase/firestore/addData";
import SubmittedPage from '@/pages/submitted';

const VerificationPage = ({setPage, data}) => {
   const [OTP, setOTP] = useState("");
   const [isResendDisabled, setIsResendDisabled] = useState(false);
   const [loading, setLoading] = useState(false);

   const router = useRouter();
   const renderButton = (buttonProps) => {
      return <button className={!isResendDisabled? styles.resendButtonDisabled : styles.resendButton}{...buttonProps}>Resend OTP</button>;
   };
   const renderTime = (remainingtime) => {
      return <button className={styles.resendTime}> 
      {remainingtime === 0 ? "" : `in ${remainingtime} seconds`}
      </button>;
   };

   const handleForm = async (e) => {
      e.preventDefault();
      setLoading(true);
      // console.log(OTP);
      
      if (OTP.length === 6) {
      const { result, error } = await verifyOTP(OTP);
      console.log(result, error);

      if (result) {
            window.user = result.user;
            const { dataRes, dataErr } = await addData('formData', data.phone, data);
            console.log(dataRes, dataErr);
            // set a submitted field to true
            localStorage.setItem('submitted', true)
            router.push('/submitted');
      }
      }
   }

   
   return (
      <main className={`${styles.main}`}>
         <form className={styles.otpForm} onSubmit={handleForm}>
            <BiArrowBack className={styles.backButton} onClick={() => setPage(1)}/>
            <div className={styles.otpHeading}>Please Enter the OTP</div>
            <div className={styles.formGroup}>

            </div>
            <div className={styles.formGroup} style={{alignItems: "center"}}>
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
            <div className={styles.formGroup} style={{alignItems: "center"}}>
               <button className={styles.submitButton} type="submit" disabled={loading}>{loading ? "Loading..." :"Verify"}</button>
            </div>
         </form>
      </main>
   );
};

export default VerificationPage;
