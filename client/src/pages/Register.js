import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

import { useState } from "react";
import { register } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: pink;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 30%;
  padding: 20px;
  background-color: #fff;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 80%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 13px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  border-radius: 10px;
`;
const Links = styled.a`
  margin: 10px 0;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const Error = styled.span`
  color: red;
`;

function Register() {
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, inputs);
  };
  console.log(inputs);
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCTION</Title>
        <Form>
          <Input
            name="email"
            type="text"
            placeholder="email"
            onChange={handleChange}
          />
          <Input
            name="username"
            type="text"
            placeholder="username"
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="password"
            onChange={handleChange}
          />
          {/* <Input
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
            onChange={handleChange}
          /> */}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Wrap>
            <Button onClick={handleClick} disabled={isFetching}>
              CREATE
            </Button>
            {error && <Error>Something went wrong</Error>}
            <Links>
              <Link to="/auth/login">LOGIN</Link>
            </Links>
          </Wrap>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Register;
