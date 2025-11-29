import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
  axios
      .get("http://localhost:5000/api/posts")
      .then((res) => {
        console.log("📥 Fetched posts:", res.data);
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("❌ Error fetching posts:", err);
      });
  }, []);


  return (
    <div className="p-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">Latest Posts</h1>
      {posts.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">No posts yet!</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition"
            >
              {post.image && (
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{post.content}</p>
                <Link
                  to={`/post/${post._id}`}
                  className="inline-block mt-4 text-blue-600 hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
