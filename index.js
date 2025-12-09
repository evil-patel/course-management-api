require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/dbconfig");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Course Management API Running...");
});

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
