const { Schema, model, SchemaTypes } = require("mongoose");

const assetSchema = new Schema(
  {
    category : 
        {type : SchemaTypes.String,
        enum : ["Crypto", "Stock", "RawMat"]},

    name : String, //Example : Bitcoin
    symbol : String, //Example : BTC
    valueAtInstant : Number
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Asset = model("Transaction", assetSchema);

module.exports = Asset;
