const { Schema, model, SchemaTypes } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
       // unique: true -> Ideally, should be unique, but its up to you
    },
    password: String,
    cash : Number,
    holdingsValue : Number,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

userSchema.methods.calculateHoldingsValue = function calculateHoldingsValue() {
  console.log('je cherche this : ',this);
  console.log('of type : ',typeof this);

};


module.exports = User;
