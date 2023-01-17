const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

const createPost = async(req, res) => {
    const headers = req.headers.Authorization || req.headers.authorization;

    const token = headers.split(" ")[1];
    const { path } = req.file;

    const { title, summary, content } = req.body;
    //const token = req.cookies;

    await jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) throw err;
        const post = Post.create({
            title,
            summary,
            content,
            cover: path,
            author: decoded.id,
        });
        res.status(200).json(post);
    });
};

const getAllPosts = async(req, res) => {
    const posts = await Post.find()
        .populate("author", ["username"])
        .sort({ createdAt: -1 })
        .limit(20);
    res.status(200).json(posts);
};

const getPost = async(req, res) => {
    const { id } = req.params;
    const post = await Post.findById(id).populate("author", ["username"]);

    res.status(200).json(post);
};

const updatePost = async(req, res) => {
    const headers = req.headers.Authorization || req.headers.authorization;

    const token = headers.split(" ")[1];
    const { path } = req.file;
    const newPath = path;
    console.log("newPath", newPath);

    //const token = req.cookies;

    await jwt.verify(token, process.env.ACCESS_TOKEN, async(err, decoded) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);
        console.log("postDoc", postDoc);
        const isAuthor =
            JSON.stringify(postDoc.author) === JSON.stringify(decoded.id);
        if (!isAuthor) {
            return res.status(400).json("you are not the author");
        }
        await postDoc.update({
            title,
            summary,
            content,
            cover: newPath ? newPath : postDoc.cover,
        });
        res.status(200).json(postDoc);
    });
};

module.exports = { createPost, getAllPosts, getPost, updatePost };