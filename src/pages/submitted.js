import styles from '@/styles/Form.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SubmittedPage() {
   const router = useRouter();
   return (
      <>
         <div className={styles.submitBox}>
         <div className={styles.subheading}>
            Submitted your Form.<br></br> Hang on tight, we will get back to you soon!
         </div>
         <div className={styles.text}>
         <span
         style={{cursor: "pointer", fontWeight: "bold"}}
         onClick={() => {
            router.replace('/')
         }
         }
         >Click here</span> to submit another request
         </div>
         </div>
      </>
   );
}