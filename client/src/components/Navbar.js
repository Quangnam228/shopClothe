import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge } from "@material-ui/core";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchProduct } from "../redux/productRedux";
const Container = styled.div`
  height: 60px;
  background-color: #eee;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 5px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;

  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  ${mobile({ flex: 2, justifyContent: "center" })}
`;
const MenuItem = styled.div`
  font-size: 20px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

function Navbar() {
  const user = useSelector((state) => state.user.currentUser?.user);

  const quantity = useSelector((state) => state.cart.quantity);
  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (q !== "") {
      const getProducts = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/products/search?title=${q}`
          );
          setProducts(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getProducts();
    }
    // return () => {

    // };
  });

  const handleClick = (products) => {
    setQ("");
    dispatch(searchProduct(products));
    navigate("/products/search");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setQ("");
      dispatch(searchProduct(products));
      navigate("/products/search");
    }
  };
  const handleLogout = () => {
    // localStorage.removeItem("persist:root");
  };
  const handleRender = () => {
    if (user) {
      return (
        <>
          <div className="navbarUser">
            <img
              src={
                user.img
                  ? user.img
                  : "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
              }
              alt="avatar"
              className="imgNavbar"
            />
            <span className="navbarUserName">{user.username}</span>
            <ul className="navbarUserMenu">
              <li className="navbarUserMenuItem">
                <a href="/account">Profile</a>
              </li>
              <li className="navbarUserMenuItem">
                <a href="/messenger">messenger</a>
              </li>
              <li className="navbarUserMenuItem">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Link to="/auth/register">
            <MenuItem>Register</MenuItem>
          </Link>
          <Link to="/auth/login">
            <MenuItem>Login</MenuItem>
          </Link>
        </>
      );
    }
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input
              type="search"
              name="search-form"
              id="search-form"
              placeholder="Search for..."
              value={q}
              onKeyDown={handleKeyDown}
              onChange={(e) => setQ(e.target.value)}
            />
            <Search
              style={{ color: "gray", fontSize: 16 }}
              onClick={() => handleClick(products)}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/home">
            <Logo>.NN</Logo>
          </Link>
        </Center>
        <Right>
          {handleRender()}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
}

export default Navbar;
