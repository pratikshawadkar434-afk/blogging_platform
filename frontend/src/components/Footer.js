import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6 text-center mt-10">
      <p>© {new Date().getFullYear()} MyBlog — All rights reserved.</p>
      <p className="text-sm mt-2">Built with ❤️ using MERN Stack</p>
    </footer>
  );
};

export default Footer;
