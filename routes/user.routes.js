const router = require("express").Router();
const isAuthenticated = require("../middleware/isAuthenticated");

// Get all user
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    // To do: calculate all havings

    const { havingValue } = await User.findById(id);
    res.status(200).json(havingValue);
  } catch (error) {
    console.log(error);
    next(error);
  }
});


// Read & calculate all user havings value
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    // To do: calculate all havings

    const { havingValue } = await User.findById(id);
    res.status(200).json(havingValue);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Read user cash
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    const { cash } = await User.findById(id);
    res.status(200).json(cash);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Delete one user
router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User successfully deleted" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
