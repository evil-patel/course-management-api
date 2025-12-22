const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.filename === "thumbnail") {
            cb(null, "uploads/thumbnails");
        }
        else {
            cb(null, "uploads/files");
        }
    },
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );
    }
});

const upload = multer({ storage });

module.exports = upload;