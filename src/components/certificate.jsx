import jsPDF from 'jspdf';
import { formContext } from "../../context/context";
import { useContext } from "react";
import styles from '@/styles/Form.module.css'



function Certificate() {
   const { formData, setFormData } = useContext(formContext);
   console.log(formData)
   // const certificateData = {
   //    name: "Ganesh Nathan",
   //    location: "Bangalore",
   //    amount: "1000",
   // }
   const generatePDF = () => {
  const pdf = new jsPDF();

  // Define the HTML content
  const html = `
    <html>
      <head>
        <style>
          /* Add your CSS styles here */
          body{
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12pt;
            line-height: 1.5;
          }
        </style>
      </head>
      <body>
        <h1>Certificate of Contribution</h1>
        <div>
        This to certify that ${formData.name} has contributed towards transforming INDIA into an AMBULANCE friendly nation.
        <br>
        ${formData.name} has played a vital role in deploying an APM Signal at ${formData.location}.
        <br>
        We also thank ${formData.name} for contributing ${formData.amount} towards this new revolutionary change.
        </div>
        <br>
        <br>
        <div>PLACE: Bangalore</div>
        <div>DATE: 03/05/2021</div>
        <br>
        <br>
        <div>Thank you</div>

        <div>Rakesh Sadasivan</div>
         <div>Founding Volunteer</div>
      </body>
    </html>
  `;

  // Add the HTML content to the PDF document
  pdf.html(html, {
    callback: function () {
      pdf.save('certificate.pdf');
    },
  });
}
  return (
    <div>
      <div className={styles.text} style={{marginTop: "2rem"}}>
      Please Download your certificate
      </div>
      <button className={styles.submitButton} onClick={generatePDF}>
         Download
      </button>
    </div>

  );
}

export default Certificate;
