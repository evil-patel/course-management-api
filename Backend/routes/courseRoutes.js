const express = require("express");
const Course = require("../models/Course");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const upload = require("../middleware/upload");


const router = express.Router();

router.post(
    "/",
    auth,
    roleCheck(["admin", "teacher"]),
    upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "file", maxCount: 1 }
    ]),
    async (req, res) => {
        try {
            const course = await Course.create({
                ...req.body,
                thumbnail: req.files.thumbnail?.[0].path,
                file: req.files.file?.[0].path
            });

            res.json({ message: "Course created", course });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
);

router.get("/", async (req, res) => {
    const list = await Course.find();
    res.json(list);
});

router.get("/:id", async (req, res) => {
    const course = await Course.findById(req.params.id);
    res.json(course);
});

router.put("/:id", auth, roleCheck(["admin", "teacher"]), async (req, res) => {
    try {
        const update = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ message: "Course updated", update });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", auth, roleCheck(["admin", "teacher"]), async (req, res) => {
    try {
        await Course.findByIdAndDelete(req.params.id);
        res.json({ message: "Course deleted" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;