import React from "react";
import ProductCatalog from "../../components/ProductCatalog";
import Stack from "react-bootstrap/Stack";

//This page uses the Product Catalog component.(Most components are seperated from the pages they are utilized in, components are imported into pages to keep the project organized and pages easily adjustable)

const Product = () => {
  return (
    <>
      <section style={{ background: "#A49789" }} className="py-5">
        <Stack
          gap="3"
          className="align-items-center my-4 mx-ms-auto px-4 text-white"
        >
          <h3 className="p-2 display-5">Shop All Products</h3>
        </Stack>
      </section>
      <ProductCatalog></ProductCatalog>
    </>
  );
};

export default Product;
