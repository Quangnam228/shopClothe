import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;

  ${mobile({ padding: "0px", flexDirection: "column" })}
`;

function Categories() {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/category");
        setCategory(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategory();
  }, []);

  return (
    <Container>
      {category.map((item) => (
        <CategoryItem item={item} key={item._id} />
      ))}
    </Container>
  );
}

export default Categories;
