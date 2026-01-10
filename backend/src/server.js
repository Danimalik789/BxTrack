const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
dotenv.config();

const app = express();

const FRONT_END_URL = process.env.FRONT_END_URL || "*";

app.use(
  cors({
    origin: FRONT_END_URL === "*" ? true : FRONT_END_URL,
    credentials: true,
  })
);
app.use(express.json());

// Connect to database on first request (serverless-friendly)
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("Database connection error:", err);
    return res.status(500).json({ message: "Database connection failed" });
  }
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use(errorMiddleware);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

// For Vercel serverless: export the app
module.exports = app;

// For local development: start the server
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error("Failed to start server:", err);
      process.exit(1);
    });
}
