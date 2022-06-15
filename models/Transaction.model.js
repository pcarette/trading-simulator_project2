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
    transactionPrice: { type: Number, require: true }, //amout * valueAtGivenTime
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
