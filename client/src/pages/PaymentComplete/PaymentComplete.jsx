import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import {useEffect, useState} from 'react';

//Completed Page component to noticy customer payment was completed and successful. Only Page without a component as it is the end page.
function PaymentComplete(props) {
  const [messageBody, setMessageBody] = useState('');
  const {stripePromise} = props;

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(`${window.location}/complete`);
      console.log(url);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const {error, paymentIntent} = await stripe.retrievePaymentIntent(
        clientSecret
      );

      setMessageBody(
        error ? (
          `> ${error.message}`
        ) : (
          <>
            &gt; Payment {paymentIntent.status}:{' '}
            <a
              href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {paymentIntent.id}
            </a>
          </>
        )
      );
    });
  }, [stripePromise]);

  return (
    <>
      <Container className="mt-3">
        <a href="/">Continue Shopping</a>
        {/* <div id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div> */}
        <section
          style={{border: ' .5em solid #A49789'}}
          className="py-5 w-auto m-2"
        >
          <Stack
            gap="3"
            className="align-items-center my-4 mx-ms-auto px-4 text-white"
          >
            <h1 style={{color: 'black'}} className="p-2 display-1">
              Thank you!
            </h1>
            <p style={{color: 'black'}} className="fs-5 text-center my-4 w-75">
              We recieved your order and we are getting started on it right
              away! You will recieve an order confirmation email shortly to the
              email provided.
            </p>
          </Stack>
          <div id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div>
        </section>
      </Container>
    </>
  );
}

export default PaymentComplete;
