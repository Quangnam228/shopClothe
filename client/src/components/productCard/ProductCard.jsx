import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import "./productCard.css";

const ProductCard = ({ item }) => {
  const options = {
    value: item.ratings,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Link className="productCard" to={`/product/${item._id}`}>
      <img src={item.image} alt={item.title} />
      <p>{item.title}</p>
      <div>
        <Rating {...options} />{" "}
        <span className="productCardSpan"> ({item.numOfReviews} Reviews)</span>
      </div>
      <span>{`$${item.price}`}</span>
    </Link>
  );
};

export default ProductCard;
