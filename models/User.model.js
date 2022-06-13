const { Schema, model, SchemaTypes } = require("mongoose");
const Holding = require("./Holding.model");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      require: true,
    },
    password: { type: String, require: true },
    holdingsValue: Number,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

userSchema.methods.calculateHoldingsValue =
  async function calculateHoldingsValue() {
    const myHoldings = await Holding.find({user: this._id})
    const myHoldingsValue = 0
    myHoldings.forEach(holding => {
      myHoldingsValue += holding.calculateHoldingValue()
    });
  };

module.exports = User;
