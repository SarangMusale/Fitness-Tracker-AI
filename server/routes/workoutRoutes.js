const express = require("express");
const router = express.Router();

const Workout = require("../models/Workout");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const workout = new Workout({
      ...req.body,
      user: req.user.id,
    });

    const savedWorkout = await workout.save();

    res.status(201).json(savedWorkout);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedWorkout = await Workout.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      req.body,
      { new: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.json(updatedWorkout);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedWorkout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deletedWorkout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.json({
      message: "Workout deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
