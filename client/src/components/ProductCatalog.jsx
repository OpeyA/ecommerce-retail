import React, {useRef} from 'react';
import {useState} from 'react';
import {useCart} from 'react-use-cart';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Sweater from '../images/sweater.jpg';
import Jacket from '../images/jacket.jpg';
import Hoodie from '../images/hoodie.jpg';
import firstJewelry from '../images/jewelry1.jpg';
import secondJewelry from '../images/jewelry2.jpg';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/esm/Container';

//images for the products are imported from the images folder(under src)
//An array of objects with the products
const products = [
  {
    id: 1,
    image: Sweater,
    title: 'Oversized Crewneck Long Sleeve Fuzzy Knit ',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    price: 20,
  },
  {
    id: 2,
    image: Jacket,
    title: 'Beverly Tweed Contrasting Stitch Trucker Jacket',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    price: 49.99,
  },
  {
    id: 3,
    image: Hoodie,
    title: 'Women Acid Wash Oversized Hoodie',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    price: 44.99,
  },
  {
    id: 4,
    image: firstJewelry,
    title: 'Diamond Necklaces for Women, Dainty 14k Gold',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    price: 25,
  },
  {
    id: 5,
    image: secondJewelry,
    title: '18K Gold Plated Bracelet Gold Clover Bracelet Set',
    description: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet',
    price: 28,
  },
];

const ProductCatalog = () => {
  // addItem is a method from useCart(a shopping cart for React) which is importaed into the component.
  //its defined; it will be used when adding products to the cartPage
  const {addItem} = useCart();
  const [show, setShow] = useState(false);

  return (
    <>
      {/* Show Alert when ietm is added to the cart */}
      {show && (
        <Container className=''>
          <Alert variant="dark" className='m-2' onClose={() => setShow(false)} dismissible>
            {' '}
            You have added a new an item to the cart. Check it out in the Cart{' '}
          </Alert>
        </Container>
      )}
      <section className="mt-5 flex flex-wrap justify-content-center">
        {/* Products are displayed in a Row(with breakpoints for how many should appear in a row according to viewpoints). The column within th row has the product, image, title, description and price displayed in a flexbox display*/}
        <Row xs={1} md={3} lg={5} className="">
          {products.map((item, i) => {
            //Defined a Ref(reference) inside the map function so that each products size gets its own reference
            const sizeRef = useRef(null);
            return (
              <Col
                className="d-flex justify-content-center mb-sm-2"
                key={item.id}
              >
                <Card
                  style={{
                    background: '#A49789',
                    width: '18rem',
                    border: 'none',
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={item.image}
                    style={{height: '25rem'}}
                  />
                  <Card.Body className="text-white">
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Card.Text>${item.price.toFixed(2)}</Card.Text>
                    <Card.Text>
                      <Form.Select ref={sizeRef}>
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                        <option>One Size</option>
                      </Form.Select>
                    </Card.Text>
                    <Button
                      //onClick the callback function does two things: 1. It calls addItems method and passes the each item's object properties and the adds a size property 2.It also sends an alert message to notify that the ietm has been added to the Cart
                      onClick={() => {
                        addItem({...item, size: sizeRef.current.value});
                        setShow(true); //show alert
                      }}
                      className="w-100 btn btn-secondary"
                      variant="dark"
                    >
                      Add to Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </section>
    </>
  );
};

export default ProductCatalog;
