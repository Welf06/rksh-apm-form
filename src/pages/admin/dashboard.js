import { useEffect, useState } from 'react';
import { auth } from "@/../firebase/config";
import getAllDocuments from '../../../firebase/firestore/getAllDocuments';
import MUIDataTable from "mui-datatables";

import styles from '@/styles/Form.module.css'

import { useRouter } from 'next/router';

export default function Dashboard() {
   const router = useRouter();
   const [loading, setLoading] = useState();
   const [pageLoading, setPageLoading] = useState(true);
   const [tableData, setTableData] = useState([]);
   useEffect(() => {
      if (!auth.currentUser || !auth.currentUser.email) {
         router.replace('/admin')
      }
      auth.onAuthStateChanged((user) => {
         if (!user) {
            router.replace('/admin')
         }
      })
      setLoading(true);
      setPageLoading(false);
      getAllDocuments().then((data) => {
         console.log(data)
         setTableData(data)
         setLoading(false)
      })
   }, [])
   const columns = [
      {
         name: "name",
         label: "Name",
         options: {
            filter: true,
            sort: true,
         }
      },
      {
         name: "phone",
         label: "Phone",
         options: {
            filter: true,
            sort: true,
         }
      },
      {
         name: "amount",
         label: "Amount",
         options: {
            filter: true,
            sort: true,
         }
      },
      {
         name: "datetime",
         label: "Date/Time",
         options: {
            filter: true,
            sort: true,
         }
      },
      {
         name: "orgName",
         label: "Organization Name",
         options: {
            filter: true,
            sort: true,
         }
      },
      {
         name: 'location',
         label: 'Location',
         options: {
           customBodyRender: (value) => {
             return `${value.lat}, ${value.lng}`;
           }
         }
       },

   ];

   const options = {
      filterType: 'checkbox',
      selectableRowsHideCheckboxes: true,
      selectableRowsHeader: false,
      searchPlaceholder: 'Search...',
      pagination: true,
      rowsPerPage: 10,
      rowsPerPageOptions: [10, 20, 50, 100],
      responsive: 'standard',
   };
   return (

      <>
         {pageLoading ? <div></div> :
            (
               <div>
                  <div className={styles.heading}>Dashboard</div>
                  <div className={styles.signOut}>
                  <button className = {`${styles.submitButton}`}onClick={() => {
                     auth.signOut()
                  }}>Sign Out</button>
                  </div>
                  <div>
                     <MUIDataTable
                        className={styles.table}
                        title={"APM Requests"}
                        data={tableData}
                        columns={columns}
                        options={options}
                     />
                  </div>
               </div>
            )
         }

      </>
   )
};