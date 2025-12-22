const mongoose = require("mongoose");

const moduleProgressSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    module: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "module",
        required: true
    },
    completed: {
        type: Boolean,
        default: true
    },
    completedAt: {
        type: Date,
        default: Date.now
    }
});

// one student can complete a module only once
moduleProgressSchema.index({ student: 1, module: 1 }, { unique: true });

module.exports = mongoose.model("moduleProgress", moduleProgressSchema);
