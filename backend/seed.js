const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");

// AI Reward Logic Simulator (used for initial seeding)
const calculateReward = (attendance, performance) => {
  if (attendance > 90 && performance > 85) {
    return { rewards: 100, badge: "Gold" };
  } else if (attendance > 75) {
    return { rewards: 50, badge: "Silver" };
  } else {
    return { rewards: 20, badge: "Bronze" };
  }
};

const baseUsers = [
  { name: "Ranvir Kumar", gender: "Male", age: 35, designation: "Software Engineer", experience: "10 years", company: "T-System", attendance: 95, performance: 92 },
  { name: "Nikhil Dabale", gender: "Male", age: 34, designation: "Software Engineer", experience: "9 years", company: "T-System", attendance: 88, performance: 85 },
  { name: "Mayuri Patil", gender: "Female", age: 36, designation: "Software Engineer", experience: "8 years", company: "T-System", attendance: 92, performance: 90 },
  { name: "Yugant Tikde", gender: "Male", age: 30, designation: "Software Engineer", experience: "9 years", company: "T-System", attendance: 85, performance: 82 },
  { name: "Hemant Patil", gender: "Male", age: 36, designation: "Software Engineer", experience: "10 years", company: "T-System", attendance: 94, performance: 91 },
  { name: "Sahil Kumar", gender: "Male", age: 32, designation: "Software Engineer", experience: "9 years", company: "T-System", attendance: 80, performance: 78 },
  { name: "Manoj Patil", gender: "Male", age: 33, designation: "Software Engineer", experience: "7 years", company: "T-System", attendance: 87, performance: 84 },
  { name: "Ravikant Bade", gender: "Male", age: 35, designation: "Software Engineer", experience: "9 years", company: "T-System", attendance: 89, performance: 86 },
  { name: "Narshina Kulkarni", gender: "Male", age: 37, designation: "Software Engineer", experience: "11 years", company: "T-System", attendance: 96, performance: 93 },
  { name: "Anirudh Dyama", gender: "Male", age: 34, designation: "Software Engineer", experience: "8 years", company: "T-System", attendance: 82, performance: 80 }
];

const users = baseUsers.map(user => {
  const { rewards, badge } = calculateReward(user.attendance, user.performance);
  return { ...user, rewards, badge };
});

const seedData = async () => {
  try {
    await User.deleteMany();
    await User.insertMany(users);
    console.log("Database Seeded with 10 Employees");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

const startSeeding = async () => {
  await connectDB();
  await seedData();
};

startSeeding();
