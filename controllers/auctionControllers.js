const AuctionItem = require('../models/auctionItems');
const fs = require('fs');
const path = require('path');

exports.seedAuctionData = async (req, res) => {
  try {
    const dataPath = path.join(__dirname, '../db/auctionData.json');
    const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

    await AuctionItem.insertMany(data);

    res.status(200).json({ message: "Data seeded successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addAuctionItem = async (req, res) => {
    const newItem = new AuctionItem({
      title: req.body.title,
      description: req.body.description,
      start_price: req.body.start_price,
      reserve_price: req.body.reserve_price
    });
   
    try {
      const savedItem = await newItem.save();
      res.status(201).json(savedItem);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

exports.getAuctions = async (req, res) => {
  try {
    const auctions = await AuctionItem.find();

    res.status(200).json(auctions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.searchAuctionItems = async (req, res) => {
    try {
      const { query } = req.query;
  
      const items = await AuctionItem.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } }
        ]
      });
  
      if (items.length === 0) {
        return res.status(404).json({ message: "No auction items found." });
      }
  
      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ error: "Error retrieving auction items", details: err.message });
    }
  };

exports.deleteAuctions = async (req, res) => {
  try {
    await AuctionItem.deleteMany();

    res.status(200).json({ message: "Auction items deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
