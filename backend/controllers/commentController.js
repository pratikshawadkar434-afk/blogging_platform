import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const addComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const comment = await Comment.create({
      post: postId,
      user: req.user.id,
      text,
    });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};
