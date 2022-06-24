import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { useLocation, useParams } from "react-router-dom";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Pagination from "react-js-pagination";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/productCard/ProductCard";
import { getAllProduct } from "../redux/apiCalls";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

function ProductList() {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 10000]);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [ratings, setRatings] = useState(0);
  const { keyword, category, setCategory } = useContext(SearchContext);

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const { products, productsCount, resultPerPage, filteredProductsCount } =
    useSelector((state) => state.product);

  // const { searchProduct } = useSelector((state) => state.filter);

  let count = filteredProductsCount;

  useEffect(() => {
    getAllProduct(
      keyword,
      currentPage,
      price,
      category,
      ratings,
      size,
      color,
      dispatch
    );
  }, [
    dispatch,
    keyword,
    currentPage,
    price,
    category,
    ratings,
    size,
    color,
    // searchProduct,
  ]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{category}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter products</FilterText>
          <Select name="color" onChange={(e) => setColor(e.target.value)}>
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
          {category !== "accessory" && (
            <Select name="size" onChange={(e) => setSize(e.target.value)}>
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

      <ProductWrapper>
        {products?.map((item, index) => (
          <ProductCard item={item} key={`${index} ${item._id}`} />
        ))}
      </ProductWrapper>

      <PaginationBox>
        {/* {resultPerPage < count && (
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resultPerPage}
            totalItemsCount={count}
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
        )} */}
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={count}
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
      <Footer />
    </Container>
  );
}

const Container = styled.div``;
const ProductWrapper = styled.div`
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
const Title = styled.div`
  margin: 20px;
  margin-bottom: 0px;
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
