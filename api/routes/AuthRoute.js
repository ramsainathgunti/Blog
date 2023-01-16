const express = require("express");
const router = express.Router();
const {
    login,
    register,
    getProfile,
    logout,
} = require("../controller/AuthController");

router
    .post("/login", login)
    .post("/register", register)
    .get("/profile", getProfile)
    .post("/logout", logout);

module.exports = router;