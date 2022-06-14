const { Schema, model, SchemaTypes } = require("mongoose");
const axios = require("axios");

const assetSchema = new Schema(
  {
    category: { type: String, enum: ["Crypto", "Stock", "Raw Material"] },

    name: String, //Example : Bitcoin
    symbol: String, //Example : BTC
    // value: Number,
    image: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

assetSchema.methods.calculateAssetValue = async function calculateAssetValue() {
  //To fetch with the API
  let promiseAssetValue = await axios(
    `https://api.binance.com/api/v3/avgPrice?symbol=${this.symbol}USDT`
  );
  return promiseAssetValue.data.price;
};

const Asset = model("Asset", assetSchema);

module.exports = Asset;
