const { Schema, model, SchemaTypes } = require("mongoose");

const assetSchema = new Schema(
  {
    category : 
        {type : String,
        enum : ["Crypto", "Stock", "Raw Material"]},

    name : String, //Example : Bitcoin
    symbol : String, //Example : BTC
    value : Number, 
    image: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

assetSchema.methods.calculateAssetValue =
  function calculateAssetValue() {
    //To fetch with the API
    this.value
  };


const Asset = model("Asset", assetSchema);

module.exports = Asset;
