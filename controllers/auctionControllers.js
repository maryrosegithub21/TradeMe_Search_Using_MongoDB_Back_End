const AuctionItem = require('../models/auctionItems');
const connectToDB = require('../db/db');

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



exports.postSearch = async (req, res) => {
  console.log('/api/auctions/search/');
  await connectToDB();
  try {
    const { input, category } = req.body;
    console.log(`Received input: ${input}, category: ${category}`); // Debugging line

    const searchCriteria = {
      $or: [
        { name: { $regex: input, $options: 'i' } },
        { description: { $regex: input, $options: 'i' } },
        { 'project_details.manufacturer.brand': { $regex: input, $options: 'i' } },
        { 'project_details.manufacturer.make': { $regex: input, $options: 'i' } },
        { 'project_details.manufacturer.model': { $regex: input, $options: 'i' } }
      ]
    };

    if (category) {
      searchCriteria.$or = [
        { 'project_details.manufacturer.brand': { $regex: category, $options: 'i' } },
        { 'project_details.manufacturer.make': { $regex: category, $options: 'i' } }
      ];
    }

    console.log('Search criteria:', searchCriteria); // Debugging line

    const auctions = await AuctionItem.find(searchCriteria).maxTimeMS(10000);
    console.log('Auctions found:', auctions); // Debugging line

    if (auctions.length > 0) {
      res.json({ results: auctions });
    } else {
      res.status(404).json({ message: 'No auctions found with the given criteria.' });
    }
  } catch (error) {
    console.error('Error searching for auctions:', error); // Debugging line
    res.status(500).json({ message: 'Error searching for auctions', error });
  }
};