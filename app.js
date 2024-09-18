require("dotenv").config();
const express = require("express");
mongoose = require("mongoose");

// ========== ROUTE IMPORT START HERE!!! ========== //
const auctionRoutes = require("./routes/auctionRoutes");


const app = express();

app.use(express.json());

// ========== MONGOOSE CONNECTION START HERE!!! ========== //
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// ========== ROOT ENDPOINT ========== //
app.get("/", (req, res) => {
  res.send("The backend is running!");
});

// ========== API START HERE!!! ========== //
app.use("/api/auctions", auctionRoutes);


const PORT = process.env.PORT || 3000;
app
  .listen(PORT, console.log(`Server is running http://localhost:${PORT}`))
  .on("error", (err) => {
    console.log(err);
  });
