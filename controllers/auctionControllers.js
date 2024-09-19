const AuctionItem = require('../models/auctionItems');

exports.getAllItems = async (req, res) => {
  try {
    const items = await AuctionItem.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching items' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const newItem = new AuctionItem(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: 'Error creating item' });
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await AuctionItem.findById(req.params.id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error fetching item' });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await AuctionItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Error updating item' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await AuctionItem.findByIdAndDelete(req.params.id);
    if (item) {
      res.json({ message: 'Item deleted' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item' });
  }
};
