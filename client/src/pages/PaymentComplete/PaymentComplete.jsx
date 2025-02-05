import Container  from 'react-bootstrap/Container';
import Stack  from 'react-bootstrap/Stack';

//Completed Page component to noticy customer payment was completed and successful. Only Page without a component as it is the end page. 
function PaymentComplete() {

  return (
    <>
      <Container className='mt-3'>
      <a href="/">Continue Shopping</a>
      {/* <div id="messages" role="alert" style={messageBody ? {display: 'block'} : {}}>{messageBody}</div> */}
      <section style={{ border: " .5em solid #A49789"}} className="py-5 w-auto m-2">
        <Stack gap="3"  className="align-items-center my-4 mx-ms-auto px-4 text-white" >
          <h1 style={{color:"black"}} className="p-2 display-1">Thank you!</h1>
          <p  style={{color:"black"}}className="fs-5 text-center my-4 w-75">We recieved your order and we are getting started on it right away! You will recieve an order confirmation email shortly to the email provided.</p>
        </Stack>
      </section>
      </Container>
    </>
  );
}

export default PaymentComplete;