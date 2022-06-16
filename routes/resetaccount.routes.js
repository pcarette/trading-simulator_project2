const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Holding = require("../models/Holding.model");
const User = require("../models/User.model");

router.patch("/", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const userToReset = await User.findByIdAndUpdate(userId, { cash: 100000});
    const holdings = await Holding.find({ user: userId });
    
    const updatesPromises = holdings.map((anHolding)=>{return Holding.findByIdAndUpdate(anHolding._id, {amount : 0})});
    await Promise.all(updatesPromises);


    userToReset.calculateHoldingsValue()
    res.status(200).json({message : "Succesfully reset. You have 0 Holdings and 100000 dollars !"})
  } catch (err) {
    next(err);
  }
});

module.exports = router;