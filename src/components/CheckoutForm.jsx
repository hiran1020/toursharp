import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.error('Stripe.js has not loaded.');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error('CardElement not found.');
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        console.error('Payment Error:', error.message);
        // Show error to the user (e.g., using a UI component)
        alert(error.message);
      } else {
        console.log('Payment Method:', paymentMethod);
        // You might want to handle further actions here, like sending payment details to your server
        // Example: Call a backend endpoint to create a payment intent or confirm the payment
        await handlePayment(paymentMethod.id);
      }
    } catch (error) {
      console.error('Error occurred during payment:', error);
      // Handle unexpected errors
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handlePayment = async (paymentMethodId) => {
    try {
      const response = await fetch('/your-backend-endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId })
      });

      const result = await response.json();

      if (result.error) {
        console.error('Backend Error:', result.error);
        alert(result.error.message);
      } else {
        // Payment succeeded
        alert('Payment successful!');
        // Perform additional actions like redirecting or updating the UI
      }
    } catch (error) {
      console.error('Error with backend request:', error);
      alert('Error communicating with the server.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Payment</h2>
      <CardElement />
      <button type="submit" disabled={!stripe}>Pay</button>
    </form>
  );
};

export default CheckoutForm;
