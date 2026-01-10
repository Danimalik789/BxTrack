const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined");
  }

  await mongoose.connect(mongoUri, {
    dbName: process.env.DB_NAME || undefined,
  });
  console.log(process.env.DB_NAME);
  console.log("MongoDB connected");
};

module.exports = connectDB;
