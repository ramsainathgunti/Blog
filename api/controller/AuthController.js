const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const login = async(req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json("Provide username and password");
    const foundUser = await User.findOne({ username });
    if (!foundUser)
        return res.status(404).json("User doesn't exist please register");
    try {
        const match = await bcrypt.compare(password, foundUser.password);
        if (!match) return res.status(401).json("Invalid credentials");
        const token = await jwt.sign({ username, id: foundUser._id },
            process.env.ACCESS_TOKEN, {
                expiresIn: "6h",
            }
        );
        res.cookie("token", token);
        res.status(200).json({ username, token });
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};
const register = async(req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        return res.status(400).json("Provide username and password");
    try {
        const hashPwd = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashPwd });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
};

const getProfile = async(req, res) => {
    const { token } = req.cookies;
    await jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) throw err;

        res.status(200).json(decoded);
    });
};

const logout = (req, res) => {
    res.cookie("token", "").json("loggedOut");
};
module.exports = { login, register, getProfile, logout };