process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require("express");
// const fetch = require('node-fetch');
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS for all routes
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use(cors());

// Proxy route
app.get("/proxy", async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "URL query parameter is required" });
  }

  try {
    const response = await fetch(url);
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error("Error fetching URL:", error);
    res
      .status(500)
      .json({ error: "Error fetching data from the specified URL" });
  }
});

app.listen(3000, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});

module.exports = app;

// https://pucit.edu.pk/fee-structure
// http://localhost:3000/proxy/?url=https://pucit.edu.pk/fee-structure
