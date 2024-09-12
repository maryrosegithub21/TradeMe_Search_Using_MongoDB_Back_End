const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

// ========== ROUTE IMPORT START HERE!!! ========== //
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// ========== ROUTE IMPORT END HERE ========== //

// ========== ROOT ENDPOINT ========== //
app.get("/", (req, res) => {
  res.send("The backend is running!");
});

// ========== API START HERE!!! ========== //
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// 
// ========== API END HERE ========== //

const PORT = process.env.PORT || 3000;
app
  .listen(PORT, console.log(`Server is running http://localhost:${PORT}`))
  .on("error", (err) => {
    console.log(err);
  });
