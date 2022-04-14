import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";

const Container = styled.div``;
const Title = styled.div`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 550;
  margin: 20px;

  ${mobile({ margin: "0px" })}
`;
const Select = styled.select`
  padding: 10px;
  margin: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Options = styled.option``;

function ProductList() {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter products</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Options disabled>Color</Options>
            <Options>white</Options>
            <Options>black</Options>
            <Options>red</Options>
            <Options>blue</Options>
            <Options>yellow</Options>
            <Options>green</Options>
          </Select>
          {cat !== "accessory" && (
            <Select name="size" onChange={handleFilters}>
              <Options disabled>size</Options>
              <Options>S</Options>
              <Options>M</Options>
              <Options>L</Options>
              <Options>XL</Options>
            </Select>
          )}
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Options value="newest">Newest</Options>
            <Options value="asc">Price (asc)</Options>
            <Options value="desc">Price (desc)</Options>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default ProductList;
