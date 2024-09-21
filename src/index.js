import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'; 
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import store from './store/store'; 

// Replace with your actual public Stripe API key
const stripePromise = loadStripe('your-public-key-here');

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}> 
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
