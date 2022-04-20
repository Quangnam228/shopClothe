import React, { useEffect, useState } from "react";
import "./orderDetail.css";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import { deleteOrder } from "../../redux/apiCalls";
import { publicRequest } from "../../requestMethods";

export default function OrderDetail() {
  const dispatch = useDispatch();
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );

  const user = useSelector((state) => state.user.currentUser?.user);
  const [productState, setProductState] = useState([]);
  const [productBoughtState, setProductBoughtState] = useState(null);
  const [quantityState, setQuantityState] = useState([]);

  let arr = [];
  let quantityProduct = [];
  let address = order.address.line1
    ? order.address.line1
    : order.address.address;

  useEffect(() => {
    const getAllProduct = async () => {
      const res = await publicRequest.get("/products/all/Products");
      setProductState(res.data.products);
    };
    const getProduct = () => {
      order.products.map((item) => {
        productState?.map((i) => {
          if (i._id === item.productId) {
            arr.push(i);
            quantityProduct.push(item.quantity);
          }
        });
      });
    };
    getProduct();
    getAllProduct();
    setProductBoughtState(arr);
    setQuantityState(quantityProduct);
  }, []);

  const handleProductBought = () => {
    return productBoughtState?.map((item, index) => (
      <div key={item.product}>
        <img src={item.image} alt="Product" />
        <Link to={`/product/${item.product}`}>{item.name}</Link>{" "}
        <span>
          {quantityState[index]} x ${item.price} ={" "}
          <b>${item.price * quantityState[index]}</b>
        </span>
      </div>
    ));
  };

  const handleClick = (e) => {
    e.preventDefault();
    deleteOrder(orderId, dispatch);
    Navigate("/account");
  };
  return (
    <>
      <Navbar />
      <div className="order">
        <h1 className="orderTitle">Order Details</h1>
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
                  {user.username}
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
                  {`Address: `} {address ? address : ""}
                </span>
              </div>
              <div className="orderShowInfo confirmCartItemsContainer">
                {handleProductBought()}
              </div>
            </div>
            <div className="orderUpdateRight">
              <button className="orderUpdateButton" onClick={handleClick}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
