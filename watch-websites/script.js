// ===== Helpers =====
function openModal(id) {
  document.getElementById(id).classList.add('active');
}
function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// Close modal via close buttons and clicking outside the box
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', () => closeModal(btn.dataset.close));
});
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
});

// ===== Login =====
document.getElementById('loginBtn').addEventListener('click', (e) => {
  e.preventDefault();
  openModal('loginOverlay');
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('loginForm').querySelector('input[type="email"]').value;
  closeModal('loginOverlay');
  document.getElementById('loginBtn').textContent = 'Logged In';
  showToast('Welcome back, ' + email.split('@')[0] + '!');
  e.target.reset();
});

// ===== Buy flow =====
let currentProduct = { name: '', price: 0 };

document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    currentProduct.name = btn.dataset.name;
    currentProduct.price = parseFloat(btn.dataset.price);

    document.getElementById('buyProductName').textContent = currentProduct.name;
    document.getElementById('buyProductPrice').textContent = currentProduct.price.toLocaleString();
    document.getElementById('buyForm').reset();
    document.getElementById('buyerQty').value = 1;
    openModal('buyOverlay');
  });
});

document.getElementById('buyForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('buyerName').value.trim();
  const phone = document.getElementById('buyerPhone').value.trim();
  const address = document.getElementById('buyerAddress').value.trim();
  const qty = parseInt(document.getElementById('buyerQty').value) || 1;
  const total = currentProduct.price * qty;

  // Fill invoice
  const invNumber = 'TL-' + Date.now().toString().slice(-8);
  const invDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  document.getElementById('invNumber').textContent = invNumber;
  document.getElementById('invDate').textContent = invDate;
  document.getElementById('invCustomerName').textContent = name;
  document.getElementById('invCustomerPhone').textContent = phone;
  document.getElementById('invCustomerAddress').textContent = address;
  document.getElementById('invItemName').textContent = currentProduct.name;
  document.getElementById('invItemQty').textContent = qty;
  document.getElementById('invItemPrice').textContent = 'Rs ' + currentProduct.price.toLocaleString();
  document.getElementById('invItemTotal').textContent = 'Rs ' + total.toLocaleString();
  document.getElementById('invGrandTotal').textContent = total.toLocaleString();

  closeModal('buyOverlay');
  openModal('invoiceOverlay');
  showToast('Order placed! Your bill is ready.');
});

// ===== Print bill =====
document.getElementById('printBillBtn').addEventListener('click', () => {
  window.print();
});

// ===== Download bill (as a standalone HTML file) =====
document.getElementById('downloadBillBtn').addEventListener('click', () => {
  const invoiceHTML = document.getElementById('invoicePrintArea').outerHTML;
  const invNumber = document.getElementById('invNumber').textContent;

  const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Invoice ${invNumber} - TimeLuxe</title>
<style>
  body { font-family: sans-serif; padding: 30px; color: #111; }
  .invoice-header { display:flex; justify-content:space-between; border-bottom:2px solid #111; padding-bottom:14px; margin-bottom:14px; }
  .invoice-header p { font-size:12px; color:#555; margin:2px 0; }
  .invoice-meta { text-align:right; font-size:13px; }
  .invoice-title { text-align:center; margin:10px 0 18px; letter-spacing:2px; color:#d4a373; }
  .invoice-bill-to { margin-bottom:16px; font-size:14px; }
  .invoice-bill-to p { margin:2px 0; color:#333; }
  .invoice-table { width:100%; border-collapse:collapse; margin-bottom:16px; font-size:14px; }
  .invoice-table th, .invoice-table td { border:1px solid #ddd; padding:8px 10px; text-align:left; }
  .invoice-table th { background:#111; color:#fff; }
  .invoice-total { text-align:right; font-size:16px; margin-bottom:16px; }
  .invoice-thanks { text-align:center; font-size:13px; color:#777; font-style:italic; }
</style>
</head>
<body>
${invoiceHTML}
</body>
</html>`;

  const blob = new Blob([fullDoc], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'TimeLuxe-Invoice-' + invNumber + '.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  showToast('Bill downloaded!');
});

// ===== Contact form =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    contactForm.reset();
    showToast('Thanks ' + name.split(' ')[0] + '! Your message has been sent.');
  });
}

// ===== Smooth scroll for shop-now / nav links =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1) {
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});