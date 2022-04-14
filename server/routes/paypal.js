// const router = require("express").Router();
// const paypal = require("paypal-rest-sdk");

// paypal.configure({
//   mode: "sandbox", //sandbox or live
//   client_id:
//     "AW25-k5bTycUaPzmkX0yl-dHRdDnr5_WYEpwxOXTMrFP_nk46OqDQsN_5JiIhmb3wIK2lfHWO9YPqMM2",
//   client_secret:
//     "EE04x-Llha2bU_ZMJDg5TTgvVvkfB4HrU4JF0RziS4w1XigFvSVjPBYKUtheVrO97GBIqf3l7HPLTHL3",
// });

// router.post("/pay", (req, res) => {
//   const create_payment_json = {
//     intent: "sale",
//     payer: {
//       payment_method: "paypal",
//     },
//     redirect_urls: {
//       return_url: "http://localhost:5000/paypal/success",
//       cancel_url: "http://localhost:5000/paypal/cancel",
//     },
//     transactions: [
//       {
//         item_list: {
//           items: req.body.cart,
//         },
//         amount: {
//           currency: "USD",
//           total: req.body.total.toString(),
//         },
//         description: "example",
//       },
//     ],
//   };

//   paypal.payment.create(create_payment_json, function (error, payment) {
//     if (error) {
//       throw error;
//     } else {
//       for (let i = 0; i < payment.links.length; i++) {
//         if (payment.links[i].rel === "approval_url") {
//           res.redirect(payment.links[i].href);
//         }
//       }
//     }
//   });
// });

// router.get("/success", (req, res) => {
//   const payerId = req.query.PayerID;
//   const paymentId = req.query.paymentId;

//   const execute_payment_json = {
//     payer_id: payerId,
//     transactions: [
//       {
//         amount: {
//           currency: "USD",
//           total: req.body.amount,
//         },
//       },
//     ],
//   };
//   paypal.payment.execute(
//     paymentId,
//     execute_payment_json,
//     function (error, payment) {
//       if (error) {
//         console.log(error.response);
//         throw error;
//       } else {
//         console.log(JSON.stringify(payment));
//         res.send("Success (Mua hàng thành công)");
//         // res.status(200).json(payment);
//       }
//     }
//   );
// });

// module.exports = router;
