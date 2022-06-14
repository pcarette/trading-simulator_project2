const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const Asset = require("../models/Asset.model");
const Holding = require("../models/Holding.model");
const Transaction = require("../models/Transaction.model");
const User = require("../models/User.model");

// Create one transaction (update user cash)
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    //
    // Create Transaction
    //
    const userId = req.user._id;
    const newTransaction = req.body;

    // Calculate asset Value
    const assetId = newTransaction.asset;
    const myAsset = await Asset.findById(assetId);
    console.log(myAsset);
    const myAssetValue = await myAsset.calculateAssetValue();

    // Create transaction with this asset value
    const absTransAmount = Math.abs(newTransaction.amount);
    let transAmount = 0;
    const transactionType = newTransaction.transactionType;
    transactionType === "BUY"
      ? (transAmount = -absTransAmount)
      : (transAmount = +absTransAmount);
    const createdTransaction = await Transaction.create({
      ...newTransaction,
      user: userId,
      valueAtGivenTime: myAssetValue,
      amount: transAmount,
    });

    //
    // Update user cash
    //
    const price = transAmount * myAssetValue;
    const { cash } = await User.findById(userId);
    const newCash = cash + price;
    await User.findByIdAndUpdate(userId, { cash: newCash });

    //
    // Create OR Update holding
    //
    const foundHolding = await Holding.findOne({ user: userId, asset: assetId });
    console.log("foundHolding", foundHolding);
    if (foundHolding.length === 0) {
      // Create
      const createdHolding = await Holding.create({
        user: userId,
        asset : assetId,
        amount: transAmount,
      });
      res.status(201).json({ createdTransaction, createdHolding });
      return;
    } else {
      // Update
      console.log({foundHolding});
      const holdingId = foundHolding._id;
      console.log({holdingId});
      const newAmount = foundHolding.amount + transAmount;
      console.log('newAmount', newAmount);
      const updatedHolding = await Holding.findByIdAndUpdate(holdingId, {
        amount: newAmount,
      });
      res.status(201).json({ createdTransaction, updatedHolding });
      return;
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Read all transactions
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const allTransactions = await Transaction.find({ user: userId });
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
