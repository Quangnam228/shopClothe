import React from "react";
import styled from "styled-components";
import { Send } from "@material-ui/icons";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })};
`;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ width: "80%" })};
`;
const Input = styled.input`
  flex: 8;
  height: 100%;
  border: none;
`;
const Button = styled.button`
  flex: 1;
  height: 100%;
  border: none;
  background-color: teal;
  color: white;
`;

function Newsletter() {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get timely update from your favorite products</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
}

export default Newsletter;
