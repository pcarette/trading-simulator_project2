const router = require("express").Router();
const isAuthenticated = require('../middleware/isAuthenticated')
// require Transaction

// Create one transaction (update user cash)
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const newTransaction = req.body;
    const createdTransaction = await User.create(newTransaction);
    res.status(200).json(createdTransaction);

    // To do: update user cash
    
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
    res.status(200).json(transaction)
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
