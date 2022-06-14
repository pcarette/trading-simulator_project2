const router = require("express").Router();
const isAuthenticated = require('../middleware/isAuthenticated');
const Holding = require("../models/Holding.model");
// require Transaction

// Read all holdings
router.get("/", async (req, res, next) => {
  try {
    const holdings = await Holding.find();
    res.status(200).json(holdings);

  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Read & calculate one specific Holding
router.get("/id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    const Holding = await User.findById(id);
    res.status(200).json(Holding);

    // To do: calculate Holding value

  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Update one specific Holding
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const updatedHolding = await User.findByIdAndUpdate(id, update, {
      new: true,
    });

    // To do: calculate Holding value

    res.status(200).json(updatedHolding);

    // update user cash
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
