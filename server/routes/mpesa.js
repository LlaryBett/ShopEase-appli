const express = require("express");
const axios = require("axios");
const getMpesaToken = require("../mpesa");

const router = express.Router();

router.post("/stkpush", async (req, res) => {
  const { phone, amount } = req.body;
  
  const shortCode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "");
  const password = Buffer.from(shortCode + passkey + timestamp).toString("base64");

  const stkData = {
    BusinessShortCode: shortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: shortCode,
    PhoneNumber: phone,
    CallBackURL: process.env.MPESA_CALLBACK_URL,
    AccountReference: "ShopEase",
    TransactionDesc: "Payment for ShopEase order",
  };

  try {
    const token = await getMpesaToken();
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      stkData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json({ success: true, message: "STK Push sent!", data: response.data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Payment failed", error: error.response.data });
  }
});

module.exports = router;
