const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");
const User = require("../models/User.model");

router.patch("/", isAuthenticated, async (req, res, next) => {
  try {
    const { cash } = await User.findOne(req.user._id);

    if (req.body.amount === 0) {
      res
        .status(400)
        .json({ error: true, reason: "Amount is null or equal to 0" });
    }

    const newBalance = Math.round(cash + req.body.amount, 2);

    const user = await User.findOneAndUpdate(
      req.user._id,
      {
        cash: newBalance,
      },
      { new: true }
    );

    res.status(200).json(user.cash);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
