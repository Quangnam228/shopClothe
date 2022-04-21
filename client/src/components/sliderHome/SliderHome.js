import React from "react";

import "./sliderHome.css";

const Home = () => {
  return (
    <>
      <div className="banner">
        <p>Welcome to NN</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a
          // href="#container"
          href="/products"
        >
          <button>Show Product</button>
        </a>
      </div>
    </>
  );
};

export default Home;
