import React from 'react';
import {useCart} from 'react-use-cart';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Stack from 'react-bootstrap/Stack';
import {Link} from 'react-router-dom';

const CartPage = () => {
  //other methods that can be used with useCart for React are declared.
  const {isEmpty, setItems, items, updateItemQuantity, removeItem, cartTotal} =
    useCart();
  //If the No Producst are added to the Cart Page; return "Your cart is empty!"
  if (isEmpty)
    return (
      <>
        <section style={{background: '#A49789'}} className="py-5">
          <Stack
            gap="3"
            className="align-items-center my-4 mx-ms-auto px-4 text-white"
          >
            <h1 className="p-2 display-6">Cart</h1>
          </Stack>
        </section>
        <Container className="m-2">
          <p className="display-6 m-3 text-align-center">
            {' '}
            Your cart is empty{' '}
          </p>
          <Link to="/products">
            <Button variant="dark" className="m-3 btn btn-primary">
              Start Shopping
            </Button>
          </Link>
        </Container>
      </>
    );
  ///If the CartPage is not empty then return these compoenets
  return (
    <>
      <section style={{background: '#A49789'}} className="py-5">
        <Stack
          gap="3"
          className="align-items-center my-4 mx-ms-auto px-4 text-white"
        >
          <h1 className="p-2 display-6">Cart</h1>
        </Stack>
      </section>
      <Container className="mt-3">
        <div className="m-3">
                  {/* Each item in the cart will be displayed in a flexbox div with a Buttons to : delete the item, increase the quantity or decrease the quatity of the item  */}
          {items.map((item, i) => (
            <div className="d-flex align-items-center gap-4 p-2" key={item.id}>
              {/* Remove button */}
              <Button
                style={{background: 'none', color: 'red', border: 'none'}}
                className=" btn-danger align-self-start fs-3"
                onClick={() => removeItem(item.id)}
              >
                &times;
              </Button>
              {/* The items picture */}
              <div className="flex-shrink-0">
                <Image style={{width: '10rem'}} src={item.image} />
              </div>
              {/* The other product details from the Cart*/}
              <div className="flex-grow-1 ms-3">
                <p>{item.title}</p>
                <p>Size: {item.size}</p>
                <p>${item.price}</p>
                <div className="d-flex gap-4">
                  {/* Reduce Quanity button; Onclick used the updateItemQuantity method */}
                  <Button
                    className="btn-secondary fs-4"
                    style={{border: 'none'}}
                    size="sm"
                    onClick={() =>
                      updateItemQuantity(item.id, (item.quantity ?? 0) - 1)
                    }
                  >
                    -
                  </Button>
                  {/* The item quantity */}
                  <p className="align-self-center">{item.quantity}</p>
                  {/* Increase Quantity button Onclick used the updateItemQuantity method  */}
                  <Button
                    className="btn-secondary"
                    size="sm"
                    style={{width: ''}}
                    onClick={() =>
                      updateItemQuantity(item.id, (item.quantity ?? 0) + 1)
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {/* The Total price of the cart is from the cartTotal method in useCart; the total is caclucalted outside of the map function of the products. */}
          <div className="d-flex justify-content-end column-gap-5">
            <h4 className="fw-light">Total: ${cartTotal.toFixed(2)}</h4>
            {/* as Link React Router so to can be set for a different path for the Checkout in the project
            onclick calls setItems method and passes the  items in the cart for the Checkout page */}
            <Button
              as={Link}
              to="/checkout"
              style={{background: '#A49789', border: '#A49789'}}
              className="text-nowrap"
              onClick={() => {
                setItems(items), console.log(JSON.stringify({items}));
              }}
            >
              Checkout
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default CartPage;
