const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const URL = process.env.DATABASE_KEY;

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Database Connected");
  } catch (error) {
    console.error("database connected" + error);
  }
};

module.exports = connectDB;
