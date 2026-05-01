
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Employee"], default: "Employee" },
  gender: String,
  age: Number,
  designation: String,
  experience: String,
  company: { type: String, default: "T-System" },
  attendance: { type: Number, default: 0 },
  performance: { type: Number, default: 0 },
  rewards: { type: Number, default: 0 },
  badge: { type: String, default: "Beginner" }
});

module.exports = mongoose.model("User", userSchema);
