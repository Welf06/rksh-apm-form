import styles from '@/styles/Form.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react'

export default function SubmittedPage() {
   let router = useRouter();

   const [submitted, setSubmitted] = useState(null);

   useEffect(() => {
      setSubmitted(localStorage.getItem('submitted'));
   }, [])

   useEffect(() => {
      console.log(submitted, !submitted, !null )
      if (submitted === 'false')
         router.replace('/');
   }, [submitted])

   return (
      <>
      {submitted === 'true' ? (
         <div className={styles.submitBox}>
            <div className={styles.heading}>
               Congratulations!
            </div>
            <div className={styles.subheading}>
               You have successfully applied for an APM Signal
            </div>
            <div className={styles.text} style={{marginTop: "2rem"}}>
               <span
                  style={{ cursor: "pointer", fontWeight: "500", textDecoration: "underline" }}
                  onClick={() => {
                     router.replace('/')
                     localStorage.setItem('submitted', false);
                  }
                  }
               >Click here</span> to apply one more APM
            </div>
            <div style={{
               fontWeight: "500",
               marginTop: "1.5rem",
               marginBottom: "0rem",
            }}>
               Share this and join the Revolution
            </div>
         </div>) :
         (
            <div>

            </div>
         )}
      </>
   );
}