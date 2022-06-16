import React, { useEffect, useState } from "react";
import Product from "./Product";
import styled from "styled-components";
import axios from "axios";
import ProductCard from "./productCard/ProductCard";
import Pagination from "react-js-pagination";
import { getAllProduct } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  padding: 0 10px 10px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const PaginationBox = styled.div`
  padding: 0 10px 10px 10px;
  display: flex;
  justify-content: center;
`;

function Products({ cat, category, filters, price, ratings }) {
  const [products, setProducts] = useState([]);
  const [productPage, setProductPage] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [prodFiltered, setFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const prod = useSelector((state) => state.product?.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/products?category=${cat}`
            : `http://localhost:5000/products?page=${currentPage}&new`
        );
        setProductPage(res.data);
        setProducts(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat, currentPage]);
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

  // useEffect(() => {
  //   if (sort === "newest") {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => a.createdAt - b.createdAt)
  //     );
  //     setProducts((prev) =>
  //       [...prev].sort((a, b) => a.createdAt - b.createdAt)
  //     );
  //   } else if (sort === "asc") {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => a.price - b.price)
  //     );
  //     setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
  //   } else {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => b.price - a.price)
  //     );
  //     setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
  //   }
  // }, [sort]);

  return (
    <>
      <Container>
        {cat
          ? filteredProducts.map((item, index) => (
              <ProductCard item={item} key={`${index} ${item._id}`} />
            ))
          : prodFiltered.map((item, index) => (
              <ProductCard item={item} key={`${index} ${item._id}`} />
            ))}
      </Container>
      <PaginationBox>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={productPage?.perPage}
          totalItemsCount={productPage?.productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
      </PaginationBox>
    </>
  );
}

export default Products;
