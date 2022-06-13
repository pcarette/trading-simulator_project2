const { Schema, model, SchemaTypes } = require("mongoose");
const Asset = require("./Asset.model");

const transactionSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      // unique: true -> Ideally, should be unique, but its up to you
    },
    asset: {
      type: SchemaTypes.ObjectId,
      ref: "Asset",
    },

    transactionType: {
      type: String,
      enum: ["BUY", "SELL"],
    },

    amount: Number, //(+ if sell, - if buy)
    valueAtGivenTime: Number,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

transactionSchema.methods.calculateAssetValueAtGivenTime =
  async function calculateAssetValueAtGivenTime() {
    try {
      const assetId = this.asset
      const myAsset = await Asset.findById(assetId)
      const assetValue = myAsset.calculateAssetValue()
      this.valueAtGivenTime = assetValue
      return assetValue
    } catch (error) {
      
    }
  };

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
