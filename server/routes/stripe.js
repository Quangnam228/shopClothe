const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51KJqyTEP8nRnvdgS5UF5qyohJaJWIVnPnH0pdDW9xtDWQfpQu7Q1Sr45Mocl9o90v9mMdwrGHVVFCyz7bpAjf5km00tVxHDDj1"
);

router.post("/payment", (req, res) => {
  try {
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
      },
      (stripeErr, stripeRes) => {
        if (stripeErr) {
          console.log(stripeErr);
          res.status(500).json(stripeErr);
        } else {
          console.log("Charge Successful");
          res.status(200).json(stripeRes);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
