import { useState, useEffect } from 'react'

import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import login from "@/../firebase/firestore/login";
import { auth } from "@/../firebase/config";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Form.module.css'


const Form = ({ setPage, setData }) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   useEffect(() => {
      // console.log(auth.currentUser )
      if (auth.currentUser && auth.currentUser.email) {
         router.replace('/admin/dashboard')
      }
   })
   const router = useRouter();
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

   const handleForm = async (e) => {
      e.preventDefault();
      setLoading(true);
      const res = await login(email, password);
      console.log(res)
      if (res.errorCode === "auth/wrong-password") {
         toast.error("Wrong Password", toastOptions);
         setLoading(false);
         return;
      }
      if (res.errorCode) {
         toast.error(res.errorMessage, toastOptions);
         setLoading(false);
         return;
      }
      if (res.user) {
         toast.success("Login Successful", toastOptions);
         setLoading(false);
         // set login admin local Cookie
         router.replace('/admin/dashboard')
         return;
      }
   };

   return (
      <>
         <ToastContainer
            position="top-center"
            autoClose={1000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
         <Head>
            <title>Admin Login </title>
            <meta name="description" content="Rksh Admin Login" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <main className={`${styles.main}`}>
            <div className={styles.headingContainer}>
               <div className={styles.logoContainer}>
                  <Image
                     src="/images/logo.png"
                     height={75} // Desired size with correct aspect ratio
                     width={150} // Desired size with correct aspect ratio
                     alt="logo"
                     className={styles.logo}
                  />
               </div>
               <div className={styles.heading}>
                  Rksh Admin Login
               </div>
            </div>
            <form className={`${styles.form} ${styles.formPartContainer}`} autoComplete="off">
               <div id="verify-phone"></div>
               <div className={styles.formForm}>
                  <div className={styles.formGroup}>
                     <label className={styles.label} htmlFor="email">Email*</label>
                     <input
                        className={styles.input}
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}

                     />
                  </div>
                  <div className={styles.formGroup}>
                     <label className={styles.label} htmlFor="password">Password*</label>
                     <input
                        className={styles.input}
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </div>
                  <div className={styles.formGroup}>
                     <button className={styles.submitButton} onClick={handleForm} style={{ alignItems: "center" }} disabled={loading}>{loading ? "Loading..." : "Login"}</button>
                  </div>
               </div>
            </form>
         </main>
      </>
   );
}

export default function Home() {
   const [page, setPage] = useState(1);
   const [data, setData] = useState(null);
   return (
      <div>
         {page == 1 ? <Form setPage={setPage} setData={setData} /> : <Verification setPage={setPage} data={data} />}
      </div>
   );
}
