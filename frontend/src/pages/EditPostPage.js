import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState("");

  // 🧠 Existing Post fetch करा
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/posts/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setPreview(`http://localhost:5000${res.data.image}`);
      })
      .catch((err) => console.error("❌ Error fetching post:", err));
  }, [id]);

  // 🧩 Update Function
  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, formData);
      alert("✅ Post updated successfully!");
      navigate(`/post/${id}`);
    } catch (err) {
      console.error("❌ Error updating post:", err);
      alert("Failed to update post!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-300">
          ✏️ Edit Post
        </h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full p-3 mb-4 border rounded"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
            className="w-full p-3 mb-4 border rounded h-32"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover mb-4 rounded"
            />
          )}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-4"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded font-semibold transition-all"
          >
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPostPage;
