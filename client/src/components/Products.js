import React, { useEffect, useState } from "react";
import Product from "./Product";
import styled from "styled-components";
import axios from "axios";
import ProductCard from "./productCard/ProductCard";

const Container = styled.div`
  padding: 0 10px 10px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function Products({ cat, filters, sort }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [prodFiltered, setFiltered] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/products?category=${cat}`
            : "http://localhost:5000/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) => {
            return item[key].includes(value);
          })
        )
      );
  }, [cat, filters, products]);

  useEffect(() => {
    !cat &&
      setFiltered(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) => {
            return item[key].includes(value);
          })
        )
      );
  }, [cat, filters, products]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
      setProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
      setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
      setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {cat
        ? filteredProducts.map((item, index) => (
            <ProductCard item={item} key={`${index} ${item._id}`} />
          ))
        : prodFiltered
            .slice(0, 10)
            .map((item, index) => (
              <ProductCard item={item} key={`${index} ${item._id}`} />
            ))}
    </Container>
  );
}

export default Products;
