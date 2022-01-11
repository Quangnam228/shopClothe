import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

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
`;
const Link = styled.a`
  margin: 10px 0;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
`;

function Login() {
  return (
    <Container>
      <Wrapper>
        <Title>SING IN</Title>
        <Form>
          <Input placeholder="username" />
          <Input placeholder="password" />
          <Button>LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD</Link>
          <Link>REGISTER</Link>
        </Form>
      </Wrapper>
    </Container>
  );
}

export default Login;
