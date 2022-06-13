const router = require("express").Router();
const isAuthenticated = require('../middleware/isAuthenticated')
// require Transaction

//Create one specific having
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const newHaving = req.body;
    const createdHaving = await User.create(newHaving);
    res.status(200).json(createdHaving);

  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Read & calculate one specific having
router.get("/id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    const having = await User.findById(id);
    res.status(200).json(having);

    // To do: calculate having value

  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Update one specific having
router.patch("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const updatedHaving = await User.findByIdAndUpdate(id, update, {
      new: true,
    });

    // To do: calculate having value

    res.status(200).json(updatedHaving);

    // update user cash
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
