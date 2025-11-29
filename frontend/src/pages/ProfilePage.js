import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Profile load error:", err);
        alert("Error loading profile");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading profile...</p>;

  if (!user)
    return <p className="text-center mt-20 text-red-500">No profile data found.</p>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-300">
          👤 My Profile
        </h2>

        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          <strong>Name:</strong> {user.name}
        </p>

        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          <strong>Email:</strong> {user.email}
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Joined at: {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
