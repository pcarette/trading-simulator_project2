const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const isAuthenticatedAndAdmin = require("../middleware/isAdmin");
const User = require("../models/User.model");

// Get all user
router.get("/all", isAuthenticatedAndAdmin, async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
});

// Get current user
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user._id;
    let myUser = await User.findById(userId);
    await myUser.calculateHoldingsValue();
    myUser = await User.findById(userId);
    res.status(200).json(myUser);
  } catch (error) {
    next(error);
  }
});

// Read user cash
router.get("/cash", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.user._id;
    const { cash } = await User.findById(id);
    res.status(200).json(cash);
  } catch (error) {
    next(error);
  }
});

// Read (and calculate) user holdings value
router.get("/holdings", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.user._id;
    const myUser = await User.findById(id);
    const holdingsValue = await myUser.calculateHoldingsValue();
    res.status(200).json(holdingsValue);
  } catch (error) {
    next(error);
  }
});

// Delete one user
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.user._id;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
