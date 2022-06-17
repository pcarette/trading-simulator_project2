const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
router.use("/auth", require("./auth.routes"));
router.use("/user", require("./user.routes"));
router.use("/transaction", require("./transaction.routes"));
router.use("/holding", require("./holding.routes"));
router.use("/asset", require("./asset.routes"));
router.use("/reset", require("./resetaccount.routes"));
router.use("/refill", require("./refilluseraccount.routes"));

module.exports = router;
