const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const authRoutes = require("./routes/authRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const profileRoutes = require("./routes/profileRoutes");

dotenv.config();

const app = express();

app.use(cors()); //line A
app.use(express.json()); //line B

app.get("/", (req, res) => {
  res.send("Fitness Tracker AI Backend Running");
});

app.use("/api/auth", authRoutes); // line c
app.use("/api/workouts", workoutRoutes); //line d
app.use("/api/profile", profileRoutes); // line e

mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Connection Failed");
    console.log(error.message);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
