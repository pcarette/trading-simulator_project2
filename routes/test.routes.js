const router = require("express").Router();
const Holding = require("../models/Holding.model")
const User = require("../models/User.model")

router.get("/test", (req, res, next) => {
  User.calculateAllHoldings()
});

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)

module.exports = router;
