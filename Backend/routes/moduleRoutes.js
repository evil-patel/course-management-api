const express = require("express");
const Module = require("../models/Module");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();

router.post("/", auth, roleCheck(["admin", "teacher"]), async (req, res) => {
    try {
        const module = await Module.create(req.body);
        res.json({ message: "Module created", module });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/course/:courseId", async (req, res) => {
    const list = await Module.find({ courseId: req.params.courseId });
    res.json(list);
});

router.put("/:id", auth, roleCheck(["admin", "teacher"]), async (req, res) => {
    const update = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Module updated", update });
});

router.delete("/:id", auth, roleCheck(["admin", "teacher"]), async (req, res) => {
    await Module.findByIdAndDelete(req.params.id);
    res.json({ message: "Module deleted" });
});

module.exports = router;
