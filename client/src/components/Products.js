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

function Products() {
  const [products, setProducts] = useState([]);
  const [productPage, setProductPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    const getProducts = async (
      keyword = "",
      Page = currentPage,
      price = [0, 10000],
      category = "",
      ratings = 0,
      size = "",
      color = ""
    ) => {
      try {
        const res = await axios.get(
          `http://localhost:5000/products/get/filter?keyword=${keyword}&page=${Page}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}&size=${size}&color=${color}`
        );
        setProductPage(res.data);
        setProducts(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [currentPage]);

  return (
    <>
      <Container>
        {products?.map((item, index) => (
          <ProductCard item={item} key={`${index} ${item._id}`} />
        ))}
      </Container>
      <PaginationBox>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={productPage?.resultPerPage}
          totalItemsCount={productPage?.productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="First"
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
