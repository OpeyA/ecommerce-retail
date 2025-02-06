import {useEffect, useState} from 'react';
import {useCart} from 'react-use-cart';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call loadStripe outside of a component’s render to avoid recreating the Stripe object on every render.
// My sandbox publishable API key.
//Publishable API key is used on the client side to securely collect payment information from users
const stripePromise = loadStripe(
  'pk_test_51QoZLfC5dKheZz5yzVKYFJYkyzVCZA2hEkndJuTcADQHGQRJBWsrqMyOP36JcY2Ev5N8J6orpEFoB5x6qK6Zp26U00Px5N4jcY'
);

function Checkout() {
  //clientSecret and setClientSecret initiatlied with useState so we can store clientSecret later from the fectch function results.
  const [clientSecret, setClientSecret] = useState('');
  //methods from useCart for React
  const {cartTotal, emptyCart} = useCart();

  useEffect(() => {
    //this is the endpoint for where the server is running in the server file
    //from the JSON response we get destructure the clientSecret and set it using setClientState
    //Catch error incase promise is not consumed/fail
    //clientSecret retuned by the sevrer enppoint is used to complete payment
    fetch('https://cozy-threads-back-end-service.onrender.com/create-payment-intent')
      .then((res) => res.json())
      .then(({clientSecret}) => {
        console.log("Client Secret:", clientSecret);
        setClientSecret(clientSecret);
      })
      .catch((error) => console.error('Error fetching payment intent:', error));
  }, []);
  

  //Appearance and loader added from Stripe documentation
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#A49789',
    },
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

  return (
    <>
      {/* passing stripePromise and the results from consuimg the fetch promise(clientSecret) to the Elements provider so the child components to access the Stripe service with the Elements consumer. */}
      {clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{clientSecret, appearance, loader}}
        >
          <CheckoutForm cartTotal={cartTotal} emptyCart={emptyCart} />
        </Elements>
      )}
    </>
  );
}

export default Checkout;
