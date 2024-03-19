import React from "react";
import Slider from "./Slider";
import FeaturedProducts from "./FeaturedProducts";
import Categories from "./Categories";
import BrandInfo from "./BrandInfo";

const HomePage = () => {
  return (
    <div className="">
      <Slider />
      <BrandInfo />
      <FeaturedProducts type="featured" />
      <Categories />
      <FeaturedProducts type="trending " />
    </div>
  );
};

export default HomePage;
