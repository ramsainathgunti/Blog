const express = require("express");
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    },
});
const upload = multer({ storage: storage });
const { createPost, getAllPosts } = require("../controller/PostController");

const router = express.Router();

router.post("/", upload.single("file"), createPost).get("/", getAllPosts);

module.exports = router;