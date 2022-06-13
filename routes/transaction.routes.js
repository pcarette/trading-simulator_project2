const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Holding = require("../models/Holding.model");
const Transaction = require("../models/Transaction.model");
const User = require("../models/User.model");

// Create one transaction (update user cash)
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const newTransaction = req.body;
    const createdTransaction = await Transaction.create(newTransaction);
    res.status(200).json(createdTransaction);

    const myUser = req.user._id;
    const { user, asset, transactionType, amount, valueAtGivenTime } =
      newTransaction;
    const sum = amount * newTransaction.calculateAssetValueAtGivenTime();
    // To do: update user cash
    myUser.updateCash(sum);

    // To do : create user holdings OR update holdings
    const foundHolding = Holding.find({ asset: asset });
    if (!foundHolding) {
      // Create
      const createdHolding = await User.create({ user, asset, amount });
      res.status(200).json(createdHolding);
    } else {
      // Update
      const id = foundHolding._id;
      const newAmount = foundHolding.amount + amount;
      const updatedHolding = await User.findByIdAndUpdate(
        id,
        { newAmount },
        {
          new: true,
        }
      );
      res.status(200).json(updatedHolding);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Read all transactions
router.get("/:userId", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const allTransactions = await User.find({ user: userId });
    res.status(200).json(allTransactions);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Read one specific transaction
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    const transaction = await Transaction.findById(id);
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
