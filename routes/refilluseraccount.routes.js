const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const User = require("../models/User.model");

router.patch("/", isAuthenticated, async (req, res, next) => {
  try {
    const { cash } = await User.findOne(req.user._id);

    if (req.body.amount <= 0) {
      res
        .status(400)
        .json({
          message: `You cannot add 0 or a negative value to your account`,
        });
    }

    const newBalance = (cash + req.body.amount).toFixed(2);

    const user = await User.findOneAndUpdate(
      req.user._id,
      {
        cash: newBalance,
      },
      { new: true }
    );
    res.status(200).json(user.cash);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
