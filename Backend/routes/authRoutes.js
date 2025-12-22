const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();

// Public Signup (student)
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({
            name,
            email,
            password: hashed,
            role: "student"
        });

        res.json({ message: "Signup successful", user: newUser });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
});


// Admin create teacher/admin
router.post("/create-user", auth, roleCheck(["admin"]), async (req, res) => {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({
            name,
            email,
            password: hashed,
            role
        });

        res.json({ message: "User created by admin", user: newUser });
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
});

module.exports = router;
