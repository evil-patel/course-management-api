const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
    enrolledAt: { type: Date, default: Date.now }
});

// Prevent duplicate enrollment
enrollmentSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("enrollment", enrollmentSchema);
