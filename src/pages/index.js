import Head from 'next/head'
import Image from 'next/image';
import { Inter } from 'next/font/google'
import styles from '@/styles/Form.module.css'

import getDocument from "../../firebase/firestore/getDocument";
import addData from "../../firebase/firestore/addData";
import documentExists from "../../firebase/firestore/documentExists";
import verifyPhone from "../../firebase/firestore/verifyPhone";
import signUp from "../../firebase/firestore/verifyPhone";
import firebase from "../../firebase/config";

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'


const inter = Inter({ subsets: ['latin'] })

const Verification = dynamic(
  () => import("@/components/verification"),
  { ssr: false }
);

const Form = ({setPage}) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [contribute, setContribute] = useState(false);

  const router = useRouter();

  const handleForm = async (e) => {
    e.preventDefault();
    const { result, error } = await verifyPhone('91' + phone);
    // console.log(verifyPhone("+911234567890"))
    console.log(result, error)
    console.log(result, error)
    if (result) {
      console.log
      setPage(2)
    }
    else if (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Head>
        <title>Rksh Innovative Solutions</title>
        <meta name="description" content="APM Signal Request" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <form className={styles.form} onSubmit={handleForm}>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="name">Name*</label>
            <input
              className={styles.input}
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="location">Location Name</label>
            <input
              className={styles.input}
              type="location"
              id="location"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              required
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
            <button className={styles.submitButton} type="submit">Verify Phone Number</button>
          </div>
        </form>
        <button id='verify-phone' className={styles.submitButton} onClick={
          () => {
            setPage(2)
          }
        }>Sample</button>
        <div id="recaptcha-wrapper" className='wrapper'>
          <div id="recaptcha-container"></div>
        </div>
      </main>
    </>
  );
}

export default function Home () {
  const [page, setPage] = useState(1);
  return (
    <div>
      {page==1 ? <Form setPage={setPage}/> : <Verification setPage={setPage}/>}
    </div>
  );
}
