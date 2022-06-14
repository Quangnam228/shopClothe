import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  incCountProduct,
  desCountProduct,
  deleteAllProduct,
} from "../redux/cartRedux";
import { dataSuccess } from "../redux/dataOrder";
import CheckOut from "../components/CheckOut";

import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormGroup } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import Paypal from "../components/Paypal";

import StripeCheckout from "react-stripe-checkout";
import { userRequest } from "../requestMethods";
const KEY =
  "pk_test_51KJqyTEP8nRnvdgSP3X0ht3FxEZVhGwP9uOiMG0wpWUYAGQGA0qlWexTSUkd9dYQuDvQzpCZ6juHCp04z14eA8Ie003VN9xSMH";

function Cart() {
  const quantity = useSelector((state) => state.cart.quantity);
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [openCheck, setOpenCheck] = useState(false);
  const [inputs, setInputs] = useState({});
  // const [errors, setErrors] = useState({});

  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total,
        });
        dispatch(dataSuccess(res.data));
        navigate("/success");
      } catch (error) {}
    };
    stripeToken && cart.total > 0 && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  const handleOpen = () => {
    if (cart.quantity !== 0) {
      return setOpen(true);
    } else {
      return;
    }
  };
  const handleClose = () => setOpen(false);

  const handleOpenCheck = () => setOpenCheck(true);
  const handleCloseCheck = () => setOpenCheck(false);

  const handleQuantity = (type, index) => {
    if (type === "dec" && cart.products[index].quantity > 1) {
      console.log(index);
      dispatch(desCountProduct(index));
    }
    if (type === "inc") {
      dispatch(incCountProduct(index));
    }
  };

  const handleDelete = (index) => {
    dispatch(deleteProduct(index));
  };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.value]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data.entries()));
    let dataOrder = { ...Object.fromEntries(data.entries()), ...cart };
    console.log(dataOrder);
    dispatch(dataSuccess(dataOrder));
    navigate("/suc");

    // dispatch(deleteAllProduct(cart.products));
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <Link to="/products">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({quantity})</TopText>
            <TopText>Your Wishlist(0)</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index) => (
              <Product key={`${index} ${product._id}`}>
                <ProductDetail>
                  <Image src={product.image} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>

                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                    <ProductSize>
                      <b>Color:</b> <ProductColor color={product.color} />
                    </ProductSize>
                    <ButtonDelete onClick={() => handleDelete(index)}>Delete</ButtonDelete>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Remove onClick={() => handleQuantity("dec", index)} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Add onClick={() => handleQuantity("inc", index)} />
                  </ProductAmountContainer>
                  <ProductPrice>$ {product.price * product.quantity}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <CheckOut
              open={openCheck}
              handleClose={handleCloseCheck}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
            <Modal open={open} onClose={handleClose}>
              <FormGroup sx={style}>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "100%" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <Stack spacing={2} direction="column">
                    <Button variant="outlined" onClick={handleOpenCheck}>
                      payment on delivery
                    </Button>
                    <StripeCheckout
                      name=".NN"
                      image="https://avatars.githubusercontent.com/u/1486366?v=4"
                      billingAddress
                      shippingAddress
                      description={`Your total is $${cart.total}`}
                      amount={cart.total * 100}
                      token={onToken}
                      stripeKey={KEY}
                    >
                      <Button variant="outlined" className="buttonVisa" onClose={handleClose}>
                        payment by visa
                      </Button>
                    </StripeCheckout>
                    {/* <Button variant="outlined" onClick={handleClose}>
                      payment by momo
                    </Button> */}

                    {/* <Paypal /> */}
                  </Stack>
                </Box>
              </FormGroup>
            </Modal>
            <SummaryButton onClick={handleOpen}>CHECKOUT NOW</SummaryButton>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}
const ButtonDelete = styled.button`
  width: 100px;
`;
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;

  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 550;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) => (props.type === "filled" ? "black" : "transparent")};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
// const DetailsModal = styled.div`
//   padding: 10px;
//   display: flex;
// `;
const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid black;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.span`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;

  ${mobile({ alignItems: "center" })}
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;

  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;

  ${mobile({ marginBottom: "5px" })};
`;
const Hr = styled.hr`
  background-color: #eee;
  border: 1px solid black;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5ps solid lightgray;
  border-radius: 10px;
  padding: 0px;
  height: 50vh;
  background-color: #eee;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  color: white;
  background-color: black;
  font-weight: 600;
`;
export default Cart;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
