// frontend/src/pages/Home.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css"; // Import your external CSS

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://launchmytech.onrender.com/api/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-heading">BLOGGING PLATFORM</h1>
      <div className="posts-wrapper">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            {post.image && <img src={post.image} alt="" className="post-image" />}
            <p className="post-content">{post.content.slice(0, 150)}...</p>
            <small className="post-date">
              {new Date(post.created_at).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
