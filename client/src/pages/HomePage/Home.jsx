import React from 'react'
import HeroCard from "../../components/HeroCard";
import ProductCatalog from "../../components/ProductCatalog";

//The homepage uses the HerocCard and Product Cataclog component(Most components are seperated from the pages they are utilized in, components are imported into pages to keep the project organized and pages easily adjustable)

const Home = () => {
  return (
    <>
    <HeroCard></HeroCard>
    <h2 className="mb-5 display-6 text-center mt-3 ">Featured Products</h2>
    <ProductCatalog></ProductCatalog>
    </>
  )
}

export default Home