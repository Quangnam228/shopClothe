import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Badge, debounce } from "@material-ui/core";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchProduct } from "../redux/productRedux";
import { resetUser } from "../redux/useRedux";
import { getFilterProduct, resetSearch } from "../redux/filterRedux";
import { SearchContext } from "../context/SearchContext";

function Navbar() {
  const { keyword, setKeyword } = useContext(SearchContext);
  const [key, setKey] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser?.user);
  const admin = user?.isAdmin;
  const quantity = useSelector((state) => state.cart.quantity);

  // const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const handleClick = (e) => {
    navigate(`/products`);
    setKeyword(key);
    dispatch(getFilterProduct(keyword));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/products`);
      setKeyword(key);
      dispatch(getFilterProduct(keyword));
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("persist:root");
    navigate("/home");
    dispatch(resetUser());
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
              {/* <li className="navbarUserMenuItem">
                <a href="/map">map</a>
              </li> */}
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
          <Link to="/auth/register" className="itemfooter">
            <MenuItem>Register</MenuItem>
          </Link>
          <Link to="/auth/login" className="itemfooter">
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
          {/* <Language>EN</Language> */}
          <SearchContainer>
            <Input
              type="search"
              name="search-form"
              id="search-form"
              placeholder="Search for..."
              // value={keyword}
              onKeyDown={handleKeyDown}
              onChange={(e) => setKey(e.target.value)}
            />
            <Search
              style={{ color: "gray", fontSize: 16 }}
              onClick={() => handleClick()}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/home">
            <Logo>.NN</Logo>
          </Link>
        </Center>
        <Right>
          <Link to="/Home" className="itemfooter">
            <MenuItem>Home</MenuItem>
          </Link>
          <Link to="/products" className="itemfooter">
            <MenuItem>Products</MenuItem>
          </Link>
          {admin && (
            <Link to="/admin/home" className="itemfooter">
              <MenuItem>Dashboard</MenuItem>
            </Link>
          )}

          {/* <div className="navbarCategory">
            <MenuItem>Category</MenuItem>
            <ul className="navbarCategoryMenu">
              <li className="navbarCategoryMenuItem">
                <a href="/products/men">men</a>
              </li>
              <li className="navbarCategoryMenuItem">
                <a href="/products/women">women</a>
              </li>
              <li className="navbarCategoryMenuItem">
                <a href="/products/accessory">accessory</a>
              </li>
            </ul>
          </div> */}

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
  font-size: 18px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

export default Navbar;
