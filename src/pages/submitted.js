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
            <div className={styles.subheading}>
               Congratulations!
            </div>
            <div>
               You have successfully applied for an APM Signal
            </div>
            <div className={styles.text}>
               <span
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                  onClick={() => {
                     router.replace('/')
                     localStorage.setItem('submitted', false);
                  }
                  }
               >Click here</span> to apply one more APM
            </div>
            <div>
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