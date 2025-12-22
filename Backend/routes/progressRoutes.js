const express = require("express");
const ModuleModel = require("../models/Module");
const moduleProgress = require("../models/moduleProgress");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");

const router = express.Router();

router.get("/course/:courseId", auth, roleCheck(["student"]), async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const studentId = req.user.id;

        const totalmodules = await ModuleModel.countDocuments({ courseId });

        const completemodules = await moduleProgress.countDocuments({
            student: studentId,
            module: {
                $in: await ModuleModel.find({ courseId }).distinct("_id")
            }
        });

        const progress = totalmodules === 0 ? 0 : Math.round((completemodules / totalmodules) * 100);

        res.json({
            courseId,
            totalmodules,
            completemodules,
            progress: `${progress}%`
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;