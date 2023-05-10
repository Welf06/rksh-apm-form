import { useEffect } from "react";
import { convertToPDF } from "../utils/convertToPDF";
import styles from "../styles/styles1.module.css";
import formStyles from "../styles/Form.module.css";
import { formContext } from "../../context/context";
import { useContext } from "react";

export default function CertificatePage() {
	const { formData, setFormData } = useContext(formContext);
   console.log(formData)
   // const formData = {
   //    name: "Ganesh",
   //    place: "Bangalore",
   //    amount: "10",
   //    datetime: "5/10/2023, 10:31:37 PM'"
   // }
	const downloadPDF = () => {
      convertToPDF();
   }
	if (formData) {
	return (
      <>
      <div style={{
            textAlign: "center",
            marginBottom: "2rem"
         }}>
         <button onClick={downloadPDF} className={formStyles.submitButton} >Download Certificate</button>
      </div>
      <div style={{display: "none"}}>
		<div className="certificate">
			<div className={styles.certificate}>
				<div className={styles.logoContainer}>
					<img className={styles.logo} src="/images/logo.png" alt="Logo" />
				</div>
				<h1 className={styles.heading}>Certificate of Contribution</h1>
				<p className={styles.body}>
					This is to certify that <span className={styles.name}>{formData.name}</span>{" "}
					has contributed towards transforming INDIA into an AMBULANCE friendly
					nation. <span className={styles.name}>{formData.name}</span> has played a vital
					role in deploying an APM Signal. 
               {/* at{" "} */}
					{/* <span className={styles.place}>[Place]</span> */}
               <br/>
               <br/>
					{ formData.amount > 0 && (
               <div>
               We also thank <span className={styles.name}>{formData.name}</span> for
					contributing <span className={styles.donation}>₹{formData.amount}</span>{" "}
					towards this new revolutionary change.
               </div>
					)
					}
				</p>
				<p className={styles.amount}>
					
				</p>

				<div className={styles.footnotes}>
					<p className={styles.body}>
						{/* <span className={styles.place}>[Place]</span> <br /> */}
						<span className={styles.date}>Date: {formData.datetime.split(",")[0]}</span>
					</p>
					<p className={styles.body}>
						Thank You <br />
						<div className={styles.signature}>
							<img className={styles.sign} src="/images/sign.jpeg" alt="Signature" />
						</div>{" "}
						<br />
                  <div className={styles.signNote}>
						Rakesh Sadasivan <br />
						Founding Volunteer <br />
                  </div>
					</p>
					<div className={styles.watermark}></div>
				</div>
			</div>
		</div>
      </div>
      </>
	);
				}
	else{
		return(
			<div>
				{/* <h1>404</h1> */}
			</div>
		);
	}
}
