import Post from "../models/postModel.js";

export const toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user.id;
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }
    await post.save();

    res.json({ likes: post.likes.length });
  } catch (err) {
    res.status(500).json({ message: "Error toggling like" });
  }
};
