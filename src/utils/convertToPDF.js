import html2pdf from 'html2pdf.js';

export function convertToPDF() {
  const element = document.querySelector('.certificate');
  const options = {
    filename: 'certificate.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
  };

  html2pdf().set(options).from(element).save();
}
