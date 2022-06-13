const { Schema, model, SchemaTypes } = require("mongoose");

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
    valueAtInstant: {
      type: SchemaTypes.Number,
      ref: "Asset",
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
