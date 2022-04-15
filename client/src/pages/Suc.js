import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { deleteAllProduct } from "../redux/cartRedux";
const Success = () => {
  const data = useSelector((state) => state.dataOrder);
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(null);
  useEffect(
    () => {
      const createOrder = async () => {
        try {
          const res = await userRequest.post("/orders", {
            userId: currentUser.user._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item.quantity,
            })),
            amount: cart.total,
            address: data.dataOrder,
          });
          console.log(res.data);
          setOrderId(res.data._id);
        } catch {}
      };
      data && createOrder();
    },
    []
    // [cart, data, currentUser]
  );
  useEffect(() => {
    dispatch(deleteAllProduct(cart));
  }, []);
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/home">
        <button
          style={{
            padding: 10,
            marginTop: 20,
            borderRadius: "20px",
            border: "none",
          }}
        >
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default Success;
