const express = require("express");
const Review = require("../models/review");
const Enrollment = require("../models/enrollment");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();

router.post("/", auth, roleCheck(["student"]), async (req, res) => {
    try {
        const { courseId, rating, comment } = req.body;

        // check enrollment
        const enrolled = await Enrollment.findOne({
            student: req.user.id,
            course: courseId
        });

        if (!enrolled) {
            return res.status(403).json({ message: "Enroll first to review" });
        }

        const review = await Review.create({
            student: req.user.id,
            course: courseId,
            rating,
            comment
        });

        res.json({ message: "Review added", review });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id", auth, roleCheck(["student"]), async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const review = await Review.findOneAndUpdate(
            { _id: req.params.id, student: req.user.id },
            { rating, comment },
            { new: true }
        );

        if (!review) {
            return res.status(404).json({ message: "Review not found or unauthorized" });
        }

        res.json({ message: "Review updated", review });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", auth, roleCheck(["student"]), async (req, res) => {
    try {
        const review = await Review.findOneAndDelete({
            _id: req.params.id,
            student: req.user.id
        });

        if (!review) {
            return res.status(404).json({ message: "Review not found or unauthorized" });
        }

        res.json({ message: "Review deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get("/course/:courseId", async (req, res) => {
    const list = await Review.find({ course: req.params.courseId })
        .populate("student", "name");
    res.json(list);
});

module.exports = router;
