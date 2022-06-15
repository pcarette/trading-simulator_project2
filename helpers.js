const User = require("./models/User.model");
const Transaction = require("./models/Transaction.model");
const Holding = require("./models/Holding.model");

async function updateCash(userId, currentCash, transactionPrice) {
  const newCash = currentCash + transactionPrice;
  await User.findByIdAndUpdate(userId, { cash: newCash });
}

async function createTransaction(
  transactionType,
  amount,
  userId,
  asset,
  assetValue
) {
  if (transactionType === "BUY") {
    amount = -Math.abs(amount);
  } else {
    amount = Math.abs(amount);
    console.log({ amount });
  }
  const transactionPrice = amount * assetValue;
  const createdTransaction = await Transaction.create({
    user: userId,
    asset,
    transactionType,
    amount,
    valueAtGivenTime: assetValue,
    transactionPrice,
  });
  return createdTransaction;
}

async function createHolding(userId, assetId, newTransaction) {
  const createdHolding = await Holding.create({
    user: userId,
    asset: assetId,
    amount: Math.abs(newTransaction.amount),
  });
  return createdHolding;
}
async function updateHolding(holding, transaction) {
  console.log("transaction.amount", transaction.amount);
  const newAmount = holding.amount - transaction.amount;
  console.log("newAmount", newAmount);
  const updatedHolding = await Holding.findByIdAndUpdate(
    holding._id,
    {
      amount: newAmount,
    },
    { new: true }
  );
  return updatedHolding;
}

module.exports = {
  updateCash,
  createTransaction,
  createHolding,
  updateHolding,
};
