const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();

// STUDENT SIGNUP (Public)
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({
            name,
            email,
            password: hashed,
        });

        res.json({ message: "Signup successful", user: newUser });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// LOGIN (Public)

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser)
        return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (!isMatch)
        return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
        { id: foundUser._id, role: foundUser.role },
        process.env.SECRET_KEY,
        { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
});


//ADMIN => CREATE TEACHER or ADMIN

router.post("/create-user", auth, roleCheck("admin"), async (req, res) => {
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
})


module.exports = router;
