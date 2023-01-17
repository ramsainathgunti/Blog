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
const {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
} = require("../controller/PostController");

const router = express.Router();

router
    .post("/", upload.single("file"), createPost)
    .get("/", getAllPosts)
    .get("/:id", getPost)
    .put("/", upload.single("file"), updatePost);

module.exports = router;