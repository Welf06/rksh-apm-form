import jsPDF from 'jspdf';
import { formData } from "../../context/context";
import { useContext } from "react";



function Certificate() {
   const { certificateData } = useContext(formData);
   console.log(certificateData)
   const generatePDF = () => {
  const pdf = new jsPDF();

  // Define the HTML content
  const html = `
    <html>
      <head>
        <style>
          /* Add your CSS styles here */
        </style>
      </head>
      <body>
        <!-- Add your HTML content here -->
        Cum
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
