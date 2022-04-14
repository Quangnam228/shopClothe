const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51KJqyTEP8nRnvdgS5UF5qyohJaJWIVnPnH0pdDW9xtDWQfpQu7Q1Sr45Mocl9o90v9mMdwrGHVVFCyz7bpAjf5km00tVxHDDj1"
);

router.post("/checkout", async (req, res) => {
  try {
    const { token, amount } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
      shipping: {
        name: token.card.name,
        address: {
          line1: token.card.address_line1,
          line2: token.card.address_line2,
          city: token.card.address_city,
          country: token.card.address_country,
          postal_code: token.card.address_zip,
        },
      },
    });
    res.status(200).json(charge);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;
