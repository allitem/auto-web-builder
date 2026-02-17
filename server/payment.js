const stripe = require("stripe")("sk_test_yourkey");
const express = require("express");
const router = express.Router();

router.post("/create-checkout", async (req,res)=>{
  const {moduleId, price} = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {name: moduleId},
        unit_amount: price*100,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel',
  });

  res.json({url: session.url});
});

module.exports = router;
