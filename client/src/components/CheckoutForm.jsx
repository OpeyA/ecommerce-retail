import {
  PaymentElement,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import {useState} from 'react';
import {useStripe, useElements} from '@stripe/react-stripe-js';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';


export default function CheckoutForm({emptyCart}) {
  const stripe = useStripe();
  const elements = useElements();
  //Setting up the state variables for the message and isloading
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    //setting isLoading to true and calling the empty cart function to remove the previous items from the cart
    setIsLoading(true);
    emptyCart();
    //using stripe confrimPayment methond and passing in elements that was initialized; also setting the return URl path to the Payment Complete page in the project. Also error handling
    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/payment-success?`,
      },
    });

    if (error) {
      setMessage(error.message);
      setIsLoading(false); // Reset loading state if there's an error
    } else {
      // Slight delay before redirecting to allow UI updates
      setTimeout(() => {
        window.location.href = '/complete';
      }, 500);
    }

    // // This point will only be reached if there is an immediate error when
    // // confirming the payment. Otherwise, your customer will be redirected to
    // // your `return_url`. For some payment methods like iDEAL, your customer will
    // // be redirected to an intermediate site first to authorize the payment, then
    // // redirected to the `return_url`.
    // if (error.type === 'card_error' || error.type === 'validation_error') {
    //   setMessage(error.message);
    // } else {
    //   setMessage('An unexpected error occured.');
    // }

    // setIsLoading(false);
  };

  return (
    <>
      <Container className="mt-5">
        <Form as="form" id="payment-form" onSubmit={handleSubmit}>
          {/* Payment element and linkauthentidationelement from stripe react imported into thsi component */}
          <LinkAuthenticationElement id="link-authentication-element" />
          <PaymentElement id="payment-element" />
          <Button
            className="mt-3"
            as="button"
            type="submit"
            style={{background: '#A49789', border: '#A49789'}}
            disabled={isLoading || !stripe || !elements}
            id="submit"
          >
            <span id="button-text">
              {isLoading ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                `Pay Now`
              )}
            </span>
          </Button>
          {/* Show any error or success messages */}
          {message && <div id="payment-message">{message}</div>}
        </Form>
      </Container>
    </>
  );
}
