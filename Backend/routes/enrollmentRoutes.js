const express = require("express");
const Enrollment = require("../models/enrollment");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();

// STUDENT ENROLL
router.post("/", auth, roleCheck(["student"]), async (req, res) => {
    try {
        const { courseId } = req.body;

        const enrollment = await Enrollment.create({
            student: req.user.id,
            course: courseId
        });

        res.json({ message: "Enrolled successfully", enrollment });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// STUDENT – VIEW OWN ENROLLMENTS
router.get("/my", auth, roleCheck(["student"]), async (req, res) => {
    const list = await Enrollment.find({ student: req.user.id })
        .populate("course");
    res.json(list);
});

// ADMIN – VIEW ALL ENROLLMENTS
router.get("/", auth, roleCheck(["admin"]), async (req, res) => {
    const list = await Enrollment.find()
        .populate("student")
        .populate("course");

    res.json(list);
});

// ADMIN – DELETE ANY ENROLLMENT
router.delete("/:id", auth, roleCheck(["admin"]), async (req, res) => {
    try {
        await Enrollment.findByIdAndDelete(req.params.id);
        res.json({ message: "Enrollment removed" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
