const { Schema, model, SchemaTypes } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      match : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      // ! The math line is to verify if it's an email
      // unique: true -> Ideally, should be unique, but its up to you
    },
    password: String,
    email : String,
    cash : Number,
    havingsValue : Number,
    calculateAllHoldings : Function // ! Probably not the correct way to declare a function in a schema !
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

userSchema.methods.calculateAllHoldings = function calculateAllHoldings() {
  console.log('je cherche this : ',this);
  console.log('of type : ',typeof this);

};


module.exports = User;
