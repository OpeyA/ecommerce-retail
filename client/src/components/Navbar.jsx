import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Navbar from 'react-bootstrap/Navbar';
import {FaCartShopping} from 'react-icons/fa6';
import {Link} from 'react-router-dom';
import { useCart } from 'react-use-cart';

//Navigation component
const Navigation = () => {
  const {totalItems} = useCart();
  return (
    <>
      <Navbar expand="lg" className="bg-light">
        <Container>
          <Navbar.Brand className="" as={Link} to="/">
            Cozy Threads
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-between flex-grow-1 ">
              {/* as="Link" allows the component to be rendered as a Link in React Router so I can use
              to="" attribute to set a path to another page.
               */}
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
              {/* as="Link" allows the component to be rendered as a Link in React Router so I can use
              to="" attribute to set a path to another page.
               */}
              <Nav.Link
                as={Link}
                to="/cart"
                className=""
                style={{width: '10rem'}}
                id="basic-nav-dropdown"
              >
                <Badge pill bg="secondary">{totalItems}</Badge>
                <FaCartShopping /> Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Navigation;
