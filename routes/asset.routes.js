const Asset = require("../models/Asset.model");
const router = require("express").Router();

// Create one specific asset
router.post("/", async (req, res, next) => {
  try {
    req.body
    const newAsset = Asset.create(req.body);
    res.status(200).json(newAsset);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Read all assets
router.get("/", async (req, res, next) => {
  try {
    const allAssets = await Asset.find();
    res.status(200).json(allAssets);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Read one specific asset
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const asset = await Asset.findById(id);
    res.status(200).json(asset);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Update one asset (value)
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const update = req.body;
    const asset = await Asset.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json(asset);

    // update user cash
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Delete one asset (value)
router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const asset = await Asset.findByIdAndDelete(id);
    res.status(200).json(asset);

    // update user cash
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
