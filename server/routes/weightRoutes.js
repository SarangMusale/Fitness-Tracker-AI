const express = require("express");
const router = express.Router();

const Weight = require("../models/Weight");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const weights = await Weight.find({
      user: req.user.id,
    }).sort({
      date: 1,
    });

    res.json(weights);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const weightEntry = await Weight.create({
      user: req.user.id,
      weight: req.body.weight,
      date: req.body.date || Date.now(),
    });

    res.status(201).json(weightEntry);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedWeight = await Weight.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deletedWeight) {
      return res.status(404).json({
        message: "Weight entry not found",
      });
    }

    res.json({
      message: "Weight entry deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
