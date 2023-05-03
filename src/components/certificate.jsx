import jsPDF from 'jspdf';
import { formData } from "../../context/context";
import { useContext } from "react";



function Certificate() {
   // const { certificateData } = useContext(formData);
   // console.log(certificateData)
   const certificateData = {
      name: "Ganesh Nathan",
      location: "Bangalore",
      amount: "1000",
   }
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
        This to certify that ${certificateData.name} has contributed towards transforming INDIA into an AMBULANCE friendly nation.
        <br>
        ${certificateData.name} has played a vital role in deploying an APM Signal at ${certificateData.location}.
        <br>
        We also thank ${certificateData.name} for contributing ₹1000 towards this new revolutionary change.
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
      <div onClick={generatePDF}>Generate PDF</div>
    </div>
  );
}

export default Certificate;
