const { Schema, model, SchemaTypes } = require("mongoose");
const Asset = require("./Asset.model");

const transactionSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      require: true,
    },
    asset: {
      type: SchemaTypes.ObjectId,
      ref: "Asset",
      require: true,
    },

    transactionType: {
      type: String,
      enum: ["BUY", "SELL"],
      require: true,
    },

    amount: { type: Number, require: true }, //(+ if sell, - if buy)
    valueAtGivenTime: { type: Number, require: true },
    // totalPriceInDollars: { type: Number, require: true } amout * valueAtGivenTime
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

// INUTILE DESORMAIS CAR GERER DIRECTEMENT DANS ROUTE CREAT TRANSAC
// transactionSchema.methods.calculateAssetValueAtGivenTime =
//   async function calculateAssetValueAtGivenTime() {
//     try {
//       const assetId = this.asset;
//       console.log('assetId', assetId);
//       const myAsset = await Asset.findById(assetId);
//       console.log('myAsset', myAsset);
//       const assetValue = await myAsset.calculateAssetValue();
//       console.log('assetValue', assetValue);
//       valueAtGivenTime = assetValue;
//       this.
//       console.log('valueAtGivenTime', valueAtGivenTime);
//       return assetValue;
//     } catch (error) {}
//   };

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
