const { Command } = require("commander");
const mongoose = require("mongoose");
const AuctionItem = require("../models/auctionItems");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

const program = new Command();

program.version("1.0.0").description("CLI for managing auction items");

async function connectToDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }

  // Add a listener for disconnection events
  mongoose.connection.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
  });

}

// async function disconnectFromDB() {
//   try {
//     await mongoose.connection.close();
//     console.log("Disconnected from MongoDB");
//   } catch (err) {
//     console.error("Error disconnecting from MongoDB", err);
//   }
// }

program
  .command("seed")
  .description("Seed the database with items from db.json")
  .action(async () => {
    await connectToDB();
    try {
      const data = JSON.parse(
        fs.readFileSync(path.join(__dirname, "../db/db.json"))
      );
      await AuctionItem.deleteMany({}); // Delete all existing items
      await AuctionItem.insertMany(data);
      console.log("Database seeded with items");
    } catch (err) {
      console.error("Error seeding database:", err);
    } finally {
      await disconnectFromDB();
    }
  });

program
  .command("deleteAll")
  .description("Delete all auction items")
  .action(async () => {
    await connectToDB();
    try {
      await AuctionItem.deleteMany({});
      console.log("All auction items deleted");
    } catch (err) {
      console.error("Error deleting items:", err);
    } finally {
      await disconnectFromDB();
    }
  });

program
  .command("getAll")
  .description("Get all auction items")
  .action(async () => {
    await connectToDB();
    try {
      const items = await AuctionItem.find({});
      console.log("Auction Items:", items);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      await disconnectFromDB();
    }
  });

program
  .command("get <id>")
  .description("Get an auction item by ID")
  .action(async (id) => {
    await connectToDB();
    try {
      const item = await AuctionItem.findById(id);
      if (item) {
        console.log("Auction Item:", item);
      } else {
        console.log("Item not found");
      }
    } catch (err) {
      console.error("Error fetching item:", err);
    } finally {
      await disconnectFromDB();
    }
  });

program
  .command("getByTitle <title>")
  .description("Get an auction item by title")
  .action(async (title) => {
    await connectToDB();
    try {
      const item = await AuctionItem.findOne({ title: new RegExp(title, "i") });
      if (item) {
        console.log("Auction Item:", item);
      } else {
        console.log("Item not found");
      }
    } catch (err) {
      console.error("Error fetching item by title:", err);
    } finally {
      await disconnectFromDB();
    }
  });

program
  .command("add")
  .description("Add a new auction item")
  .requiredOption("-t, --title <title>", "Title of the auction item")
  .requiredOption(
    "-d, --description <description>",
    "Description of the auction item"
  )
  .requiredOption(
    "-s, --start_price <start_price>",
    "Start price of the auction item"
  )
  .requiredOption(
    "-r, --reserve_price <reserve_price>",
    "Reserve price of the auction item"
  )
  .action(async (options) => {
    await connectToDB();
    try {
      const newItem = new AuctionItem({
        title: options.title,
        description: options.description,
        start_price: parseFloat(options.start_price),
        reserve_price: parseFloat(options.reserve_price),
      });
      await newItem.save();
      console.log("New auction item added:", newItem);
    } catch (err) {
      console.error("Error adding item:", err);
    } finally {
      await disconnectFromDB();
    }
  });

program
  .command("delete <id>")
  .description("Delete an auction item by ID")
  .action(async (id) => {
    await connectToDB();
    try {
      const item = await AuctionItem.findByIdAndDelete(id);
      if (item) {
        console.log("Auction item deleted:", item);
      } else {
        console.log("Item not found");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
    } finally {
      await disconnectFromDB();
    }
  });

  // Search Data
program
  .command('search-auctions <name>')
  .description('Search for auctions by name')
  .action(async (name) => {
    await connectToDB();
    try {
      const searchCriteria = { name: { $regex: name, $options: 'i' } }; // Case-insensitive search
      const auctions = await AuctionItem.find(searchCriteria).maxTimeMS(10000); // Adjust the timeout value as needed
      if (auctions.length > 0) {
        console.log('Found auctions:', auctions);
      } else {
        console.log('No auctions found with the given title.');
      }
    } catch (error) {
      console.error('Error searching for auctions:', error);
    }
  });


  
program.parse(process.argv);
