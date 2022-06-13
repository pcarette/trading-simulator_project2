const { Schema, model, SchemaTypes } = require("mongoose");

const havingSchema = new Schema(
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
    calculateValue : Function // ! Probably not the correct way to declare a function in a schema !
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Having = model("Having", havingSchema);

module.exports = Having;
