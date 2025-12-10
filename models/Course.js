const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: { type: String, require: true },
    description: String,
    category: String,
    teacher: String,
    price: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("course",courseSchema);