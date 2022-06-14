const User = require("./models/User.model");
const Transaction = require("./models/Transaction.model");
const Holding = require("./models/Holding.model");

async function updateCash(amount, assetValue, currentCash, userId) {
  const price = amount * assetValue;
  const newCash = currentCash + price;
  await User.findByIdAndUpdate(userId, { cash: newCash });
}

async function createTransaction(transaction, userId, assetValue) {
  let { transactionType, amount } = transaction;
  if (transactionType === "BUY") {
    amount = -Math.abs(amount);
  } else {
    amount = Math.abs(amount);
  }
  const createdTransaction = await Transaction.create({
    ...transaction,
    user: userId,
    valueAtGivenTime: assetValue,
    amount,
  });
  return createdTransaction;
}

async function createHolding(userId, assetId, newTransaction) {
  const createdHolding = await Holding.create({
    user: userId,
    asset: assetId,
    amount: newTransaction.amount,
  });
  return createdHolding;
}
async function updateHolding(holding, newTransaction) {
  const newAmount = holding.amount + newTransaction.amount;
  console.log("newAmount", newAmount);
  const updatedHolding = await Holding.findByIdAndUpdate(holding._id, {
    amount: newAmount,
  });
  return updatedHolding;
}

module.exports = {
  updateCash,
  createTransaction,
  createHolding,
  updateHolding,
};
