import React from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import NewReleases from "../components/Newsletter";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import SliderHome from "../components/sliderHome/SliderHome";

function Home() {
  return (
    <>
      <div>
        <Navbar />
        <Announcement />
        <Slider />
        {/* <SliderHome /> */}
        <Categories />
        <Products cat="" filters="" sort="" />
        {/* <NewReleases /> */}
        <Footer />
      </div>
      <Outlet />
    </>
  );
}

export default Home;
