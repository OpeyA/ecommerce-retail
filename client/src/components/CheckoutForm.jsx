import {
  PaymentElement,
  LinkAuthenticationElement,
} from '@stripe/react-stripe-js';
import {useState} from 'react';
import {useStripe, useElements} from '@stripe/react-stripe-js';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

export default function CheckoutForm({emptyCart}) {
  const stripe = useStripe();
  const elements = useElements();
  //Setting up the state variables for the message and isloading
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsLoading(true);
    emptyCart();

    const {error, paymentIntent} = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: 'if_required',
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent.status === 'succeeded') {
      navigate('/complete'); // Redirect within the React app
    } else {
      setMessage('Payment processing...');
    }

    setIsLoading(false);
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
