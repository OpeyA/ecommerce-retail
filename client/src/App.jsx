import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage/Home';
import Products from './pages/ProductPage/Product';
import Cart from './pages/CartPage/CartPage';
import Checkout from './pages/CheckoutPage/CheckoutPage';
import PaymentComplete from './pages/PaymentComplete/PaymentComplete';
import {CartProvider} from 'react-use-cart';
import {loadStripe} from '@stripe/stripe-js';
import {useState, useEffect} from 'react';
//Pages are imported into the App.jsx file. The only component directly imported is Navbar so the navigation remains the same with all pages.
//CartProvider is from the useCart react shopping cart. The application needs to be wrapped in it so that the useCart hook can access the cart state and current values.

////Publishable API key is used on the client side to securely collect payment information from users
// const stripePromise = loadStripe("pk_test_51QoZLfC5dKheZz5yzVKYFJYkyzVCZA2hEkndJuTcADQHGQRJBWsrqMyOP36JcY2Ev5N8J6orpEFoB5x6qK6Zp26U00Px5N4jcY");

//Using React Router to route between pages. Each Route takes the path and the element to

const App = () => {
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    fetch('https://cozy-threads-back-end-service.onrender.com/config').then(async (r) => {
      const {publishableKey} = await r.json();
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  return (
    <>
      <Router>
        <CartProvider>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/complete"
              element={<PaymentComplete stripePromise={stripePromise} />}
            />
          </Routes>
        </CartProvider>
      </Router>
    </>
  );
};
export default App;
