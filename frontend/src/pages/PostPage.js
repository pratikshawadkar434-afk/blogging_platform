import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      navigate("/");
    }
  };

  if (!post) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        {post.image && (
          <img
            src={`http://localhost:5000${post.image}`}
            alt={post.title}
            className="w-full h-80 object-cover rounded-lg mb-4"
          />
        )}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
          {post.title}
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>

        <div className="flex justify-between items-center mt-6">
          <Link
            to={`/edit/${post._id}`}>
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
            ✏️ Edit
            </button>
            </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
