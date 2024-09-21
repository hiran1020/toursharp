import React, { useState } from 'react';

const PaymentForm = ({ amount, onPaymentSuccess }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = (e) => {
    e.preventDefault();
    // Simulate successful payment
    setTimeout(() => {
      onPaymentSuccess();
      alert('Payment successful!');
    }, 1000);
  };

  return (
    <form onSubmit={handlePayment}>
      <h3>Total Amount: ${amount}</h3>
      <label>Card Number:</label>
      <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
      <label>Expiry Date:</label>
      <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
      <label>CVV:</label>
      <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} />
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default PaymentForm;
