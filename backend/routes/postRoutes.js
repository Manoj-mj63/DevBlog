const express = require("express");

const router = express.Router();

const {
    getAllPosts,
    createPost,
    getPostsByAuthor,
    getPostById,
    updatePost,
    deletePost
} = require("../controllers/postController");

// ==========================
// GET All Posts
// ==========================
router.get("/", getAllPosts);

// ==========================
// CREATE Post
// ==========================
router.post("/", createPost);

// ==========================
// GET Posts By Author
// ==========================
router.get("/author/:author", getPostsByAuthor);

// Get Single Post
router.get("/:id", getPostById);
// Update Post
router.put("/:id", updatePost);

// ==========================
// DELETE Post
// ==========================
router.delete("/:id", deletePost);

module.exports = router;