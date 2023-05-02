import { useState, useEffect } from 'react'

import Head from 'next/head'
import Image from 'next/image';
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import addData from "../../firebase/firestore/addData";
import verifyPhone from "../../firebase/firestore/verifyPhone";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '@/styles/Form.module.css'

import BillingComponent from '@/components/billingComponent'
import GoogleMaps from '@/components/googleMaps';

const Verification = dynamic(
  () => import("@/components/verification"),
  { ssr: false }
);

const Form = ({ setPage, setData }) => {
  const [name, setName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [phone, setPhone] = useState('');
  const [contribute, setContribute] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [amount, setAmount] = useState(0);

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
    console.log(location)
    const nameRegex = /^[a-zA-Z ]{2,30}$/;
    // const orgNameRegex = /^[a-zA-Z0-9 ]{2,30}$/;
    const phoneRegex = /^[0-9]{10}$/;
    if (!nameRegex.test(name)) {
      toast.error("Please enter a valid name", toastOptions);
      setLoading(false);
      return;
    }
    // if (!orgNameRegex.test(orgName)) {
    //   toast.error("Please enter a valid organization name", toastOptions);
    //   setLoading(false);
    //   return;
    // }
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid phone number", toastOptions);
      setLoading(false);
      return;
    }
    
    if(!location){
      toast.error("Please select a location", toastOptions);
      setLoading(false);
      return;
    }
    const { result, error } = await verifyPhone('+91' + phone);
    // console.log(result, error)
    if (result) {
      setData({
        name: name,
        orgName: orgName,
        phone: phone,
        location: location,
        datetime: new Date().toLocaleString(),
        amount: amount,
      })
      setPage(2)
    }
    else if (error) {
      setLoading(false)
      toast.error(error.message, toastOptions);
      console.log(error)
    }
  }

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
        <title>APM Form</title>
        <meta name="description" content="APM Signal Request" />
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
          APM Signal Form
        </div>
        <div className={styles.dummyHeading}>

        </div>
        </div>
        <form className={`${styles.form} ${styles.formPartContainer}`} onSubmit={handleForm} autoComplete="off">
          <div className={styles.formForm}>
            <div id="verify-phone"></div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">Name*</label>
              <input
                className={styles.input}
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}

              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="orgName">Organisation Name</label>
              <input
                className={styles.input}
                type="strin"
                id="org-name"
                name="orgName"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="phone">Phone*</label>
              <input
                className={styles.input}
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className={`${styles.formGroup}`} >
              <label className={styles.label} htmlFor="check">
                <input
                  className={styles.checkbox}
                  type='checkbox'
                  id='check'
                  name='check'
                  onChange={(e) => {
                    if (e.target.checked)
                      setContribute(true);
                    else
                      setContribute(false);
                  }}
                />
                I would like to contribute</label>
            </div>
              <div className={styles.qrContainer} style={{
                visibility: contribute ? "visible" : "hidden",
              }}>
                <div className={styles.qrText}>Scan the QR Code to pay</div>
                <Image
                  src="/images/qrCode.jpeg"
                  height={150} // Desired size with correct aspect ratio
                  width={150} // Desired size with correct aspect ratio
                  alt="QR Code"
                  className={styles.qrCode}
                />
              </div>
            <div className={styles.formGroup}>
              <button className={styles.submitButton} type="submit" style={{ alignItems: "center" }} disabled={loading}>{loading ? "Loading..." : "Apply"}</button>
            </div>
          </div>
          <div className={styles.formMap}>
            <GoogleMaps setLocation={setLocation}/>
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
