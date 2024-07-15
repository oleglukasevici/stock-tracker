const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const axios = require("axios");

admin.initializeApp();

const db = admin.firestore();
console.log({ user: process.env.EMAIL, pass: process.env.PASSWORD });
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const fetchStockIndices = async (symbol, date) => {
  const API_KEY = process.env.POLYGON_API_KEY;
  const BASE_URL = "https://api.polygon.io/v2/aggs/ticker";

  const response = await axios.get(
    `${BASE_URL}/${symbol}/range/1/hour/${date}/${date}`,
    {
      params: {
        apiKey: API_KEY,
      },
    }
  );

  return response.data;
};

exports.checkAlerts = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async (context) => {
    const alertsSnapshot = await db.collection("alerts").get();
    const alerts = alertsSnapshot.docs.map((doc) => doc.data());

    for (const alert of alerts) {
      const userSnapshot = await db.collection("users").doc(alert.userId).get();
      const user = userSnapshot.data();
      const stockData = await fetchStockIndices(alert.symbol, "latest"); // Fetch the latest data
      console.log("user.email", user.email);
      const latestPrice = stockData.results[0].c; // Close price
      if (latestPrice >= alert.price) {
        const mailOptions = {
          from: process.env.EMAIL,
          to: user.email,
          subject: "Stock Price Alert",
          text: `The stock price of ${alert.symbol} has reached your threshold of ${alert.price}`,
        };

        await transporter.sendMail(mailOptions);
        await db.collection("alerts").doc(alert.id).delete();
      }
    }
  });
