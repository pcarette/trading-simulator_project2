const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Asset = require("../models/Asset.model");
const Holding = require("../models/Holding.model");
const Transaction = require("../models/Transaction.model");
const User = require("../models/User.model");
const {
  updateCash,
  createTransaction,
  createHolding,
  updateHolding,
} = require("../helpers");

//
// Create one transaction (update cash, create/update holding)
//
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const newTransaction = req.body;
    const userId = req.user._id;
    const assetId = newTransaction.asset;
    const { cash } = await User.findById(userId);
    const holding = await Holding.findOne({ user: userId, asset: assetId });
    const transactionType = newTransaction.transactionType;
    const myAsset = await Asset.findById(assetId);
    const myAssetValue = await myAsset.calculateAssetValue();

    // Check if enough cash
    if (transactionType === "BUY") {
      if (cash < myAssetValue * newTransaction.amount) {
        res.status(401).json({ message: `You don't have enough cash` });
        return;
      }
    }

    // Check if enough holding
    if (transactionType === "SELL") {
      if (!holding) {
        res.status(401).json({ message: `You don't own any holdings` });
        return;
      }
      if (holding.amount < newTransaction.amount) {
        res.status(401).json({ message: `You don't own enough holdings` });
        return;
      }
    }

    // Create Transaction
    const createdTransaction = await createTransaction(
      newTransaction,
      userId,
      myAssetValue
    );

    // Update user cash
    await updateCash(createdTransaction.amount, myAssetValue, cash, userId);

    //
    // TO do : Create OR Update holding
    //
    if (transactionType === "BUY") {
      if (!holding) {
        const createdHolding = await createHolding(
          userId,
          assetId,
          createdTransaction
        );
        res.status(200).json({ createdTransaction, createdHolding });
        return;
      } else {
        const updatedHolding = await updateHolding(holding, createdTransaction);
        res.status(200).json({ createdTransaction, updatedHolding });
        return;
      }
    }

    if (transactionType === "SELL") {
      const updatedHolding = updateHolding(holding, createdTransaction);
      res.status(200).json({ createdTransaction, updatedHolding });
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//
// Read all user transactions
//
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const allUserTransactions = await Transaction.find({ user: userId });
    res.status(200).json(allUserTransactions);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//
// Read one specific transaction
//
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const id = req.params.id;
    const transaction = await Transaction.findOne({ id, user: userId });
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

//
// Delete all transactions
//
router.delete("/", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user._id;
    await Transaction.deleteMany({ user: userId });
    res.status(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
