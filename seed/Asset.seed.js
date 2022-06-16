const mongoose = require("mongoose");
require("dotenv/config");
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/trading-simulator";

const Asset = require("../models/Asset.model");
const stocks = require("./Stocks.json");
const cryptos = require("./cryptos.json");

// Array.prototype.push.apply(assets, stocks);

async function seed() {
  try {
    // Connection to the database
    const databaseInfo = await mongoose.connect(MONGO_URI);
    console.log(
      `Connected to Mongo! Database name: "${databaseInfo.connections[0].name}"`
    );
    await Asset.deleteMany();
    const cryptosCreated = await Asset.create(cryptos);
    const stocksCreated = await Asset.create(stocks)
    console.log(`Created ${cryptosCreated.length} cryptos & ${stocksCreated.length} stocks on database`);
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
}

seed();
