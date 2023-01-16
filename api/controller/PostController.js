const Post = require("../models/Post");

const createPost = async(req, res) => {
    const { path } = req.file;
    const { title, summary, content } = req.body;
    const { token } = req.cookies;

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
    const posts = await Post.find();
    res.status(200).json(posts);
};

module.exports = { createPost, getAllPosts };