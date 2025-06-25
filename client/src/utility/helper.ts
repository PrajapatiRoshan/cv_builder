import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const formatDateToInput = (isoString: string | Date) => {
  const date = new Date(isoString);
  return date.toISOString().split('T')[0];
};

export const formateDateToISO = (date: string | Date) => new Date(date);

export const downloadPDF = async () => {
  const cv = document.getElementById('cv-content');
  if (!cv) return;

  // Store original state
  const origOverflow = cv.style.overflow;
  const origHeight = cv.style.height;

  // Make it fully expand to its content
  cv.style.overflow = 'visible';
  cv.style.height = 'auto';

  await new Promise((r) => setTimeout(r, 100)); // wait for layout

  const canvas = await html2canvas(cv, { scale: 2, useCORS: true } as any);
  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const imgH = (canvas.height * pageW) / canvas.width;

  let yOffset = 0;
  let heightLeft = imgH;

  while (heightLeft > 0) {
    pdf.addImage(imgData, 'PNG', 0, yOffset, pageW, imgH);
    heightLeft -= pageH;
    yOffset -= pageH;
    if (heightLeft > 0) {
      pdf.addPage();
    }
  }

  pdf.save('cv-preview.pdf');

  // Restore container styles
  cv.style.overflow = origOverflow;
  cv.style.height = origHeight;
};

export const handlePrint = () => {
  const container = document.getElementById('cv-content');
  if (!container) return;

  const originalStyle = container.getAttribute('style');
  container.style.height = 'auto';
  container.style.overflow = 'visible';
  container.style.maxHeight = 'none';

  setTimeout(() => {
    window.print();

    if (originalStyle) {
      container.setAttribute('style', originalStyle);
    } else {
      container.setAttribute('style', '');
    }
  }, 500);
};

// export const handlePayment = async () => {
//   const res = await fetch('/api/create-order', {
//     method: 'POST',
//   });
//   const data = await res.json();

//   const options = {
//     key: 'YOUR_RAZORPAY_KEY_ID',
//     amount: data.amount,
//     currency: 'INR',
//     name: 'Resume Builder Pro',
//     description: 'Download Resume',
//     order_id: data.id,
//     handler: function (response: any) {
//       // Payment successful, now print
//       handlePrint();
//     },
//     prefill: {
//       name: 'Roshan Ji',
//       email: 'roshan.user@gmail.com',
//     },
//     theme: {
//       color: '#3399cc',
//     },
//   };

//   const razor = new (window as any).Razorpay(options);
//   razor.open();
// };

