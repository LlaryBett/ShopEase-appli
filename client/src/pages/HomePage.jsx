// src/pages/HomePage.jsx

import React from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import MostPopular from "../components/MostPopular"; // Import MostPopular component
import TopSellers from "../components/TopSellers";
import ShopByBrand from "../components/ShopByBrand";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <FeaturedProducts />
      <ShopByBrand/>
      <MostPopular /> {/* Add the MostPopular component below FeaturedProducts */}
      <TopSellers/>
      <Footer/>

      

    </div>
  );
};

export default HomePage;
