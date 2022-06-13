const { Schema, model, SchemaTypes } = require("mongoose");

const assetSchema = new Schema(
  {
    category : 
        {type : String,
        enum : ["Crypto", "Stock", "Raw Material"]},

    name : String, //Example : Bitcoin
    symbol : String, //Example : BTC
    valueAtInstant : Number
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Asset = model("Asset", assetSchema);

module.exports = Asset;
