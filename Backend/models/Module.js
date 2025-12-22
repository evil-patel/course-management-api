const mongoose = require("mongoose")

const moduleSchema = new mongoose.Schema({
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
    title: { type: String, required: true },
    description: String,
    order: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("module", moduleSchema);