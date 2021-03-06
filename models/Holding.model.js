const { Schema, model, SchemaTypes } = require("mongoose");
const Asset = require("./Asset.model");

const holdingSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      require: true,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    asset: {
      type: SchemaTypes.ObjectId,
      ref: "Asset",
      require: true,
    },
    amount: { type: Number, require: true },
    valueInDollars: Number,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

holdingSchema.methods.calculateHoldingValue =
  async function calculateHoldingValue() {
    try {
      const assetId = this.asset;
      const myAsset = await Asset.findById(assetId);
      const assetValue = await myAsset.calculateAssetValue();
      this.valueInDollars = assetValue * this.amount;
      await this.save();
      return this.valueInDollars;
    } catch (error) {
      console.error(error);
    }
  };

const Holding = model("Holding", holdingSchema);

module.exports = Holding;
