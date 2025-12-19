require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbconfig");

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const moduleRoutes = require("./routes/moduleRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const moduleProgressRoutes = require("./routes/moduleProgressRoutes");
const progressRoutes = require("./routes/progressRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const review = require("./models/review");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/modules", moduleRoutes);
app.use("/enrollments", enrollmentRoutes);
app.use("/module-progress", moduleProgressRoutes);
app.use("/progress", progressRoutes);
app.use("/reviews", reviewRoutes);
app.use("/uploads", express.static("uploads"));


app.get("/", (req, res) => {
    res.send("Course Management API Running...");
});

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
