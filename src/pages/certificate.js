import React, { useState } from 'react';

function CertificateGenerator() {
  const [certificate, setCertificate] = useState(null);

  const handleGenerateCertificate = async () => {
    // Retrieve the necessary data from the database
    const response = await fetch('https://your-api-url.com/data');
    const data = await response.json();

    // Generate the certificate using the provided template with the retrieved data
    const certificateTemplate = `
      <h1 style="font-weight: bold">Certificate of Contribution</h1>

      <p>This is to certify that ${data.name} has contributed towards transforming the world to a better place. ${data.name} has done an excellent job.</p>

      ${data.contribution ? `<p>We also thank ${data.name} for contributing $${data.contribution} towards this new revolutionary change.</p>` : ''}
    `;

    setCertificate(certificateTemplate);
  };

  return (
    <div>
      <p>Fill out this form to receive your certificate:</p>
      <form>
        <label>
          Full Name:
          <input type="text" name="name" />
        </label>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Did you make a contribution?
          <select name="contribution">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </label>
        <button type="button" onClick={handleGenerateCertificate}>Generate Certificate</button>
      </form>
      {certificate &&
        <div>
          <p>Your certificate is ready!</p>
          <a href={`data:text/html;charset=utf-8,${encodeURIComponent(certificate)}`} download="certificate.html">Download Certificate</a>
        </div>
      }
    </div>
  );
}

export default CertificateGenerator;
