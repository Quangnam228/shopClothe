import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { Rating } from "@material-ui/lab";
import { Rating } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import ReviewCard from "./reviewCard/ReviewCard";
import { getAllUser } from "../redux/apiCalls";

function Product() {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const TOKEN = currentUser?.accessToken;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const options = {
    size: "large",
    value: product.ratings || 0,
    readOnly: true,
    precision: 0.5,
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await userRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (error) {}
    };
    getProduct();
    getAllUser(dispatch);
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      quantity < product.inStock && setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    if (product.inStock === 0) {
      return;
    } else {
      if (TOKEN) {
        dispatch(addProduct({ ...product, quantity, color, size }));
      } else {
        navigate("/auth/login");
      }
    }
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.image} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>

          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            {!product.categories && (
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize onChange={(e) => setSize(e.target.value)}>
                  {product.size?.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
                </FilterSize>
              </Filter>
            )}
          </FilterContainer>
          <span>{`inStock: ${product.inStock}`}</span>
          <div className="detailsBlock-2">
            <Rating {...options} />
            <span className="detailsBlock-2-span">
              {" "}
              ({product.numOfReviews} Reviews)
            </span>
          </div>
          <button onClick={submitReviewToggle} className="submitReview">
            Submit Review
          </button>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} />
            </AmountContainer>
            <ButtonClick onClick={handleClick}>Add To Cart</ButtonClick>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <h3 className="reviewsHeading">REVIEWS</h3>

      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>Submit Review</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={(e) => setRating(e.target.value)}
            value={rating}
            size="large"
          />

          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </DialogContent>
        <DialogActions>
          <Button onClick={reviewSubmitHandler} color="primary">
            Submit
          </Button>
          <Button onClick={submitReviewToggle} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews &&
            product.reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
        </div>
      ) : (
        <p className="noReviews">No Reviews Yet</p>
      )}
      <Newsletter />
      <Footer />
    </Container>
  );
}
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;

  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
  ${mobile({ height: "60vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 180px;
`;

const Desc = styled.p`
  margin: 20px 0;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin: 5px;
  padding: 3px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border: 1px solid teal;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const ButtonClick = styled.button`
  padding: 10px;
  border-radius: 30px;
  border: 2px solid teal;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

export default Product;
