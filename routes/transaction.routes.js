const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const isAuthenticatedAndAdmin = require("../middleware/isAdmin");
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
// Buy route
//
router.post("/buy", isAuthenticated, async (req, res, next) => {
  try {
    const { asset, amount } = req.body;
    console.log({ asset });
    const userId = req.user._id;
    const { cash } = await User.findById(userId);
    const holding = await Holding.findOne({ user: userId, asset });
    const myAsset = await Asset.findById(asset);
    console.log({ myAsset });
    const myAssetValue = await myAsset.calculateAssetValue();
    console.log({ myAssetValue });

    // Check if enough cash
    if (cash < myAssetValue * amount) {
      res.status(401).json({ message: `You don't have enough cash` });
      return;
    }
    // Create Transaction
    const createdTransaction = await createTransaction(
      (transactionType = "BUY"),
      amount,
      userId,
      asset,
      myAssetValue
    );

    // Update user cash
    await updateCash(userId, cash, createdTransaction.transactionPrice);

    // Create OR Update holding
    if (!holding) {
      const createdHolding = await createHolding(
        userId,
        asset,
        createdTransaction
      );
      res.status(200).json({ createdTransaction, createdHolding });
      return;
    } else {
      const updatedHolding = await updateHolding(holding, createdTransaction);
      res.status(200).json({ createdTransaction, updatedHolding });
      return;
    }
  } catch (error) {
    next(error);
  }
});

//
// Sell route
//
router.post("/sell", isAuthenticated, async (req, res, next) => {
  try {
    const { asset, amount } = req.body;
    const userId = req.user._id;
    const { cash } = await User.findById(userId);
    const holding = await Holding.findOne({ user: userId, asset: asset });
    const myAsset = await Asset.findById(asset);
    const myAssetValue = await myAsset.calculateAssetValue();

    // Check if enough holding
    if (!holding) {
      res.status(401).json({ message: `You don't own any holdings` });
      return;
    }
    if (holding.amount < Math.abs(amount)) {
      res.status(401).json({ message: `You don't own enough holdings` });
      return;
    }

    // Create Transaction
    const createdTransaction = await createTransaction(
      (transactionType = "SELL"),
      amount,
      userId,
      asset,
      myAssetValue
    );

    // Update user cash
    await updateCash(userId, cash, createdTransaction.transactionPrice);

    // Update holding
    const updatedHolding = await updateHolding(holding, createdTransaction);
    res.status(200).json({ createdTransaction, updatedHolding });
    return;
  } catch (error) {
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
    next(error);
  }
});

//
// Delete all transactions
//
router.delete("/", isAuthenticatedAndAdmin, async (req, res, next) => {
  try {
    const userId = req.user._id;
    await Transaction.deleteMany({ user: userId });
    res.status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
