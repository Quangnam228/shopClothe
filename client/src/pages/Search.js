import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import ProductCard from "../components/productCard/ProductCard";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

function Search() {
  const product = useSelector((state) => state.product.products);

  return (
    <>
      <Navbar />
      <Announcement />
      <Container>
        {product.map((item) => {
          return <ProductCard item={item} key={item._id} />;
          // return <Product item={item} key={item._id} />;
        })}
      </Container>
      <Newsletter />
      <Footer />
    </>
  );
}

export default Search;
