import React, { useEffect, useState } from "react";
import "./orderDetail.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateOrder } from "../../redux/apiCalls";

export default function OrderDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );
  const users = useSelector((state) => state.users.users);
  const product = useSelector((state) => state.product.products);
  const [productState, setProductState] = useState([]);
  const [quantityState, setQuantityState] = useState([]);

  let arr = [];
  let quantityProduct = [];
  let address = order.address.line1
    ? order.address.line1
    : order.address.address;

  useEffect(() => {
    const getProduct = () => {
      order.products.map((item) => {
        product.map((i) => {
          if (i._id === item.productId) {
            arr.push(i);
            quantityProduct.push(item.quantity);
          }
        });
      });
    };
    getProduct();
    setProductState(arr);
    setQuantityState(quantityProduct);
  }, []);

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    updateOrder(orderId, inputs, dispatch);
  };
  return (
    <div className="order">
      <h1 className="orderTitle">Edit order</h1>
      <div className="orderContainer">
        <div className="orderShow">
          <div className="orderShowTop">
            <div className="orderShowTopTitle">
              <span className="orderShowordername"></span>
            </div>
          </div>
          <div className="orderShowBottom">
            <span className="orderShowTitle">Order Details</span>

            <div className="orderShowInfo">
              <span className="orderShowInfoTitle">
                {`Id: `} {order._id}
              </span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowInfoTitle">
                {`Customer: `}
                {users.map((u) => {
                  if (order.userId === u._id) {
                    return u.username;
                  }
                })}
              </span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowInfoTitle">
                {`Amount: $`} {order.amount}
              </span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowInfoTitle">
                {`Status: `} {order.status}
              </span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowInfoTitle">
                {`Address: `} {address}
              </span>
            </div>
            <div className="orderShowInfo confirmCartItemsContainer">
              {productState.map((item, index) => (
                <div key={item.product}>
                  <img src={item.image} alt="Product" />
                  <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
                  <span>
                    {quantityState[index]} x ${item.price} ={" "}
                    <b>${item.price * quantityState[index]}</b>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="orderUpdate">
          <span className="orderUpdateTitle">Edit</span>
          <form className="orderUpdateForm">
            <div className="orderUpdateLeft">
              <div className="orderUpdateItem">
                <label>status</label>
                <select
                  id="isAdmin"
                  className="orderUpdateInput"
                  onChange={handleChange}
                  name="status"
                >
                  <option name="status" value="pending">
                    Pending
                  </option>
                  <option name="status" value="approved">
                    Approved
                  </option>
                </select>
              </div>
            </div>
            <div className="orderUpdateRight">
              <button className="orderUpdateButton" onClick={handleClick}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
