const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Holding = require("../models/Holding.model");
const User = require("../models/User.model");

// Read one holding (and calculate)
router.get("/id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const holding = await User.findOne({ id, user: userId });
    await holding.calculateHoldingValue();
    holding = await User.findOne({ id, user: userId });
    res.status(200).json(holding);

    // To do: calculate Holding value
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
