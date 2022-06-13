const router = require("express").Router();
const isAuthenticated = require('../middleware/isAuthenticated')
// require Transaction

//Create one specific Holding
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const newHolding = req.body;
    const createdHolding = await User.create(newHolding);
    res.status(200).json(createdHolding);

  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Read & calculate one specific Holding
router.get("/id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    const Holding = await User.findById(id);
    res.status(200).json(Holding);

    // To do: calculate Holding value

  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Update one specific Holding
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const updatedHolding = await User.findByIdAndUpdate(id, update, {
      new: true,
    });

    // To do: calculate Holding value

    res.status(200).json(updatedHolding);

    // update user cash
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
