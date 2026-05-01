const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get all users (for Leaderboard and Analytics)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ rewards: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update Employee (Trigger AI Logic)
router.post("/update", async (req, res) => {
  try {
    const { id, attendance, performance } = req.body;

    let rewards = 0;
    let badge = "Bronze";

    // AI-based decision logic
    if (attendance > 90 && performance > 85) {
      rewards = 100;
      badge = "Gold";
    } else if (attendance > 75) {
      rewards = 50;
      badge = "Silver";
    } else {
      rewards = 20;
      badge = "Bronze";
    }

    const user = await User.findByIdAndUpdate(
      id,
      { attendance, performance, rewards, badge },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
