import React, { useEffect } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { deleteAllProduct } from "../redux/cartRedux";
export default function Paypal() {
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  //   const handleClick = () => {
  //     dispatch(deleteAllProduct(cart.products));
  //     navigate("/success");
  //   };

  return (
    <div>
      <PayPalButton
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: cart.total.toString(),
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          console.log(data);
          return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);
            // OPTIONAL: Call your server to save the transaction
            // return fetch("/orders", {
            //   method: "post",
            //   body: JSON.stringify({
            //     orderID: data.orderID,
            //   }),
            // });
          });
        }}
      />
    </div>
  );
}
