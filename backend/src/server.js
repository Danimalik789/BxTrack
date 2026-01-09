const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/config");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");
dotenv.config();

const app = express();

const FRONT_END_URL = process.env.FRONT_END_URL;

app.use(cors({ origin: FRONT_END_URL, credentials: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

app.use(errorMiddleware);

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
