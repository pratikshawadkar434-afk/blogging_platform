import Post from "../models/postModel.js";
import multer from "multer";
import path from "path";

// 🖼 Image Upload Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });

// 📌 Create Post
export const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const post = new Post({ title, content, author, image });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error("❌ Error creating post:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
};

// 📌 Get All Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error("❌ Error fetching posts:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
};

// 📌 Get Single Post
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to get post" });
  }
};

// 📌 Update Post
export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const updatePost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, image },
      { new: true }
    );
    res.json(updatePost);
  } catch (err) {
    console.error("❌ Error updating post:", err);
    res.status(500).json({ error: "Failed to update post" });
  }
};

// 📌 Delete Post
export const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete post" });
  }
};
