const Asset = require("../models/Asset.model");
const stocks = require("./Stocks.json");
let assets = require("./cryptos.json");

Array.prototype.push.apply(assets, stocks);

async function seed() {
  try {
    await Asset.deleteMany();
    const assetsCreated = await Asset.create(assets);
    console.log(`Created ${assetsCreated.length} assets on database`);
  } catch (err) {
    console.log(err);
  }
}
seed();
