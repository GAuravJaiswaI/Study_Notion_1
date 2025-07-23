const mongoose = require("mongoose");
require("dotenv").config();

const { MONGODB_URL } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("✅ DB Connection Success");
  } catch (error) {
    console.error("❌ DB Connection Failed:", error);
    process.exit(1); // Exit the process only if critical
  }
};

module.exports = connectDB;
