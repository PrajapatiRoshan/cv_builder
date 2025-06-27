import { fontType } from '@/types/api.type';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const getTypographyStyles = (item: fontType) => ({
  fontSize: item.fontSize || '1rem',
  fontFamily: item.fontFamily || 'Roboto, sans-serif',
  color: item.fontColor || '#000',
});

export const formatDateToInput = (isoString: string | Date) => {
  const date = new Date(isoString);
  return date.toISOString().split('T')[0];
};

export const formateDateToISO = (date: string | Date) => new Date(date);

export const downloadPDF = async () => {
  const cv = document.getElementById('cv-content');
  if (!cv) return;

  const origOverflow = cv.style.overflow;
  const origHeight = cv.style.height;

  cv.style.overflow = 'visible';
  cv.style.height = 'auto';

  await new Promise((r) => setTimeout(r, 100));

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

const loadRazorpay = (src: string) =>
  new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

export const handleRazorpayPayment = async () => {
  const res = await loadRazorpay('https://checkout.razorpay.com/v1/checkout.js');
  if (!res) {
    alert('Razorpay SDK failed to load');
    return;
  }

  const orderRes = await fetch('http://localhost:8000/user/createOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount: 500 }),
  });
  const orderData = await orderRes.json();

  const options = {
    key: 'rzp_test_rSQ9hgAaVXTHD0',
    amount: orderData.amount,
    currency: orderData.currency,
    name: 'CV builder',
    description: 'Test Transaction',
    order_id: orderData.id,
    handler: function (response: any) {
      alert(`Payment ID: ${response.razorpay_payment_id}`);
      alert(`Order ID: ${response.razorpay_order_id}`);
      alert(`Signature: ${response.razorpay_signature}`);
    },
    prefill: {
      name: 'John Doe',
      email: 'john@example.com',
      contact: '9999999999',
    },
    theme: {
      color: '#3399cc',
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
};

