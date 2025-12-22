const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected");
    }
    catch (err) {
        console.log("DB error :", err);
    }
};

module.exports =connectDB;