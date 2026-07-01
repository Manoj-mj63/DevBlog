const Post = require("../models/Post");

// ===============================
// Get All Posts
// ===============================

const getAllPosts = async (req, res) => {

    try {

        const posts = await Post.find().sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching posts",
            error: error.message
        });

    }

};

// ===============================
// Create New Post
// ===============================

const createPost = async (req, res) => {

    try {

        const {
            title,
            description,
            image,
            category,
            author
        } = req.body;

        if (
            !title ||
            !description ||
            !image ||
            !category ||
            !author
        ) {

            return res.status(400).json({
                message: "Please fill all fields"
            });

        }

        const post = await Post.create({

            title,
            description,
            image,
            category,
            author

        });

        res.status(201).json({

            message: "Post Created Successfully",

            post

        });

    } catch (error) {

        res.status(500).json({

            message: "Error creating post",

            error: error.message

        });

    }

};

// ===============================
// Get Posts By Author
// ===============================

const getPostsByAuthor = async (req, res) => {

    try {

        const posts = await Post.find({

            author: req.params.author

        });

        res.status(200).json(posts);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};
// ===============================
// Get Single Post
// ===============================

const getPostById = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        res.status(200).json(post);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error fetching post",
            error: error.message
        });

    }

};

// ===============================
// Delete Post
// ===============================

// ===============================
// Delete Post
// ===============================

const deletePost = async (req, res) => {

    try {

        const post = await Post.findByIdAndDelete(req.params.id);

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Error deleting post",
            error: error.message
        });

    }

};
// ===============================
// Update Post
// ===============================

const updatePost = async (req, res) => {

    try {

        const post = await Post.findByIdAndUpdate(

            req.params.id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!post) {

            return res.status(404).json({

                message: "Post not found"

            });

        }

        res.status(200).json({

            message: "Post updated successfully",

            post

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            message: "Error updating post",

            error: error.message

        });

    }

};



module.exports = {

    getAllPosts,
    createPost,
    getPostsByAuthor,
    getPostById,
    updatePost,
    deletePost

};