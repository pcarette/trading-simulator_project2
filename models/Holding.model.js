const { Schema, model, SchemaTypes } = require("mongoose");

const holdingSchema = new Schema(
  {
    user: {
      type : SchemaTypes.ObjectId,
      ref : "User"
      // unique: true -> Ideally, should be unique, but its up to you
    },
    asset : {
        type : SchemaTypes.ObjectId,
        ref : "Asset"
    },

    amount : Number,
    value : Number, //To fetch with the API
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Holding = model("Holding", holdingSchema);

module.exports = Holding;
