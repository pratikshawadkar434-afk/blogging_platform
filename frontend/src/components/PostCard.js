import React from "react";

const PostCard = ({ post }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
    {post.image && (
      <img
        src={`http://localhost:5000/uploads/${post.image}`}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
    )}
    <div className="p-5">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
        {post.content}
      </p>
    </div>
  </div>
);

export default PostCard;
