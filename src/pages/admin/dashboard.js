import {useEffect, useState} from 'react';
import { auth } from "@/../firebase/config";
import getAllDocuments from '../../../firebase/firestore/getAllDocuments';

import { useRouter } from 'next/router';

export default function Dashboard() {
   const router = useRouter();
   useEffect(() => {
      auth.onAuthStateChanged((user) => {
         if (!user) {
             router.replace("/admin");
         }
      })
   }, [])
   return(
      <>
         Dashboard
         <button onClick={() => auth.signOut()}>Sign Out</button>
      </>
   )
};