import styles from '@/styles/Form.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import CertificateGenerator from "@/components/certificate.jsx";
import { AiOutlineHome } from 'react-icons/ai'
import {ImCross} from 'react-icons/im'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
   position: "top-center",
   autoClose: 1000,
   hideProgressBar: true,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "light",
};


export default function SubmittedPage() {
   let router = useRouter();

   const [submitted, setSubmitted] = useState(null);

   useEffect(() => {
      // setSubmitted(localStorage.getItem('submitted'));
      setSubmitted('true');
   }, [])

   // useEffect(() => {
   //    console.log(submitted, !submitted, !null )
   //    if (submitted === 'false')
   //       router.replace('/');
   // }, [submitted])

   const handleShare = () => {
      const textToCopy = "https://rksh-impact.vercel.app/form";
      navigator.clipboard.writeText(textToCopy)
         .then(() => {
            console.log(`Copied to clipboard`);
            toast.success("Link copied to clipboard", toastOptions);
         })
         .catch((error) => {
            console.error(`Error copying text: ${error}`);
         });
   }
   return (
      <>
         <ToastContainer />
         {submitted === 'true' ? (
            <>
               <div className={styles.submitBox}>
               <Link href="https://rkshimpact.com/">
                  <div className={styles.homeButton} onClick={() => {
                     localStorage.setItem('submitted', false);
                     // router.push('https://rkshimpact.com/');
                  }}><ImCross />
                  </div>
                  </Link>
                  <div className={styles.heading}>
                     Congratulations!
                  </div>
                  <div className={styles.subheading}>
                     You have successfully applied for an APM Signal
                  </div>
                  <div style={{ textAlign: "center" }}>
                     <CertificateGenerator />
                  </div>
                  <div className={styles.text} style={{ marginTop: "2rem" }}>
                     <span
                        style={{ cursor: "pointer", fontWeight: "500", textDecoration: "underline" }}
                        onClick={() => {
                           router.replace('/form')
                           localStorage.setItem('submitted', false);
                        }
                        }
                     >Click here</span> to apply one more APM
                  </div>
                  <div className={styles.text} style={{ marginTop: "1rem" }}>
                     <span
                        style={{ cursor: "pointer", fontWeight: "500", textDecoration: "underline" }}
                        onClick={() => {
                           router.push('/map')
                           // localStorage.setItem('submitted', false);
                        }
                        }
                     >Click here</span> to view all APMs Applied
                  </div>
               </div>
               <div style={{
                  fontWeight: "500",
                  marginTop: "0rem",
                  marginBottom: "0rem",
                  textAlign: "center",
               }}>
                  <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={handleShare}> Share this</span> and join the Revolution
               </div>
            </>) :
            (
               <div>

               </div>
            )}
      </>
   );
}