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

    const { result, error } = await verifyPhone('+91' + phone);
    // console.log(result, error)
    if (result) {
      setData({
        name: name,
        orgName: orgName,
        phone: phone,
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
        <title>Rksh Innovative Solutions</title>
        <meta name="description" content="APM Signal Request" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main}`}>
        <div id="verify-phone"></div>
        <form className={styles.form} onSubmit={handleForm} autoComplete="off">
          <div className={styles.heading}>
            APM Signal Form
          </div>
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
          {contribute && (
            <div className={styles.qrContainer}>
              <div className={styles.qrText}>Scan the QR Code to pay</div>
              <Image
                src="/images/SampleQRCode.png"
                height={200} // Desired size with correct aspect ratio
                width={200} // Desired size with correct aspect ratio
                alt="QR Code"
                className={styles.qrCode}
              />
            </div>
          )}
          <div className={styles.formGroup}>
            <button className={styles.submitButton} type="submit" style={{ alignItems: "center" }} disabled={loading}>{loading ? "Loading..." : "Apply"}</button>
          </div>
        </form>
        <button id='verify-phone' className={styles.submitButton} onClick={
          () => {
            addData('formData', "+91987643210", {
              phone: "9876543210",
              orgName: "",
              name: "A"
            })
              .then((res) => {
                // console.log(res);
              })
              .catch((err) => {
                console.log(err)
                toast.error(err.message, toastOptions);
              })
          }
        }>Sample</button>
        <div id="recaptcha-wrapper" className='wrapper'>
          <div id="recaptcha-container"></div>
        </div>
        <BillingComponent/>
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
