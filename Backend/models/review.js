const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

reviewSchema.index({ student: 1, course: 1 }, { unique: true });

module.exports = mongoose.model("review", reviewSchema);
