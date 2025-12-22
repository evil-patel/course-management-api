const express = require("express");
const ModuleProgress = require("../models/moduleProgress");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();


// STUDENT – mark module as completed
router.post("/complete", auth, roleCheck(["student"]), async (req, res) => {
    try {
        const { moduleId } = req.body;

        const progress = await ModuleProgress.create({
            student: req.user.id,
            module: moduleId
        });

        res.json({ message: "Module completed", progress });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// STUDENT – view completed modules
router.get("/my", auth, roleCheck(["student"]), async (req, res) => {
    const list = await ModuleProgress.find({ student: req.user.id })
        .populate("module");

    res.json(list);
});

module.exports = router;
