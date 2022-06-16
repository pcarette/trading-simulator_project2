const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Holding = require("../models/Holding.model");
const User = require("../models/User.model");

// Read one holding (and calculate)
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    let holding = await Holding.findOne({ id, user: userId });
    await holding.calculateHoldingValue();
    holding = await Holding.findOne({ id, user: userId }).populate("asset", {
      name: 1,
    });
    res.status(200).json(holding);
  } catch (error) {
    next(error);
  }
});

// Read all user holding (and calculate)
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const myUser = await User.findById(userId);
    await myUser.calculateHoldingsValue();
    const holdings = await Holding.find({ user: userId }).populate("asset", {
      name: 1,
    });
    res.status(200).json(holdings);

    // To do: calculate Holding value
  } catch (error) {
    next(error);
  }
});

module.exports = router;
