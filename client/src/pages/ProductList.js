import React, { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Products from "../components/Products";
import ProductsCopy from "../components/ProductsCopy";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

function ProductList({ keyword }) {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});

  const [price, setPrice] = useState([0, 10000]);
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [ratings, setRatings] = useState(0);

  console.log(price);
  console.log(category);
  console.log(ratings);
  console.log(filters);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

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
            <Options value="">Color</Options>
            <Options>white</Options>
            <Options>yellow</Options>
            <Options>brown</Options>
            <Options>black</Options>
            <Options>red</Options>
            <Options>blue</Options>
            <Options>green</Options>
          </Select>
          <Select onChange={(e) => setCategory(e.target.value)}>
            <Options value="">category</Options>
            <Options value="men">men</Options>
            <Options value="women">women</Options>
            <Options value="accessory">accessory</Options>
          </Select>
          {cat !== "accessory" && (
            <Select name="size" onChange={handleFilters}>
              <Options value="">size</Options>
              <Options>S</Options>
              <Options>M</Options>
              <Options>L</Options>
              <Options>XL</Options>
            </Select>
          )}
        </Filter>
        <div className="filterBox">
          <div className="filterBoxPrice">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={10000}
            />
          </div>

          <fieldset>
            <Typography component="legend">Ratings Above</Typography>
            <Slider
              value={ratings}
              onChange={(e, newRating) => {
                setRatings(newRating);
              }}
              aria-labelledby="continuous-slider"
              valueLabelDisplay="auto"
              min={0}
              max={5}
            />
          </fieldset>
        </div>
      </FilterContainer>
      <ProductsCopy
        cat={cat}
        filters={filters}
        category={category}
        price={price}
        ratings={ratings}
      />
      <Footer />
    </Container>
  );
}

const Container = styled.div``;
const Title = styled.div`
  margin: 20px;
  font-size: 38px;
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

export default ProductList;
