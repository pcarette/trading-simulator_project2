const { Schema, model, SchemaTypes } = require("mongoose");
const axios = require("axios");
require("dotenv/config");


const assetSchema = new Schema(
  {
    category: { type: String, enum: ["Crypto", "Stock", "Raw Material"] },

    name: String, //Example : Bitcoin
    symbol: String, //Example : BTC
    image: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

assetSchema.methods.calculateAssetValue = async function calculateAssetValue() {
  //To fetch with the API
  if (this.category == "Crypto") {
      try{

          const promiseAssetValue = await axios(
              `https://api.binance.com/api/v3/avgPrice?symbol=${this.symbol}USDT`
              );
              console.log(promiseAssetValue.data.price);
              return promiseAssetValue.data.price;
        } catch(err) {
            console.log(err)
        }
  } else if (this.category == "Stock") {
    try{
        const TOKEN = process.env.IEXAPIKEY;
        const promiseAssetValue = await axios(
            `https://cloud.iexapis.com/stable/tops?token=${TOKEN}&symbols=${this.symbol}`
            );
           console.log(promiseAssetValue.data[0].lastSalePrice);
           return promiseAssetValue.data[0].lastSalePrice;
        } catch (err) {
            console.log(err);
        }
  }
};

const Asset = model("Asset", assetSchema);

module.exports = Asset;
