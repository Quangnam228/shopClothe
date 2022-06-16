import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { login } from "../redux/apiCalls";
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
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 80%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 35%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  margin-bottom: 5px;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Links = styled.a`
  margin: 10px 0;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  console.log(error);
  console.log(isFetching);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email: username, password });
  };
  return (
    <Container>
      <Wrapper>
        <Title>SING IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick}>LOGIN</Button>
          <Links>DO NOT YOU REMEMBER THE PASSWORD</Links>
          <Links>
            <Link to="/auth/register">REGISTER</Link>
          </Links>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login;
