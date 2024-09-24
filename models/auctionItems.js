const mongoose = require('mongoose');

const auctionItemSchema = new mongoose.Schema({
  name: String,
  image: String,
  start_bid: Number,
  current_bid: Number,
  buy_now: Number,
  project_details: {
    condition: String,
    colour: String,
    item_length: Number,
    item_width: Number,
    item_height: Number,
    item_weight: Number,
    material: String,
    features: String,
    manufacturer: {
      brand: String,
      make: String,
      model: String
    },
    year_made: Number
  },
  shipping: {
    shipping: String,
    returns: String,
    payment: String
  },
  description: String
});

const AuctionItem = mongoose.model("AuctionItem", auctionItemSchema);

module.exports = AuctionItem;





