import React from "react";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { Link } from "react-router";

//HeroCard component that is used on the Homepage
const HeroCard = () => {
  return (
    <>
      <section style={{ background: "#A49789"}} className="py-5" >
        <Stack gap="3"  className="align-items-center my-4 mx-ms-auto px-4 text-white" >
          <h1 className="p-2 display-1">Cozy Threads</h1>
          <p className="fs-5 text-center my-4 w-75"><b className="fw-semibold">Welcome to Cozy Threads - </b> where comfort meets style. We believe fashion should feel as good as it looks, which is why we curate high-quality, ethically-sourced cozy essentials designed for everyday elegance. From soft sweaters to effortlessly chic loungewear, our collections blend warmth and a timeless design. Cozy Thread has the perfect piece to keep you feeling your best.</p>
          <Link to="/products"><Button variant="dark">Shop Now</Button></Link>
        </Stack>
      </section>
    </>
  );
};

export default HeroCard;
