import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditPost.css"; // 👈 Add this line

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    axios.get(`http://localhost:5000/api/posts`).then((res) => {
      const post = res.data.find((p) => p._id === id);
      if (!post) {
        alert("Post not found");
        navigate("/admin");
        return;
      }
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
    });
  }, [id, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    try {
      await axios.put(
        `http://localhost:5000/api/posts/${id}`,
        { title, content, image },
        { headers: { Authorization: token } }
      );
      alert("Post updated");
      navigate("/admin");
    } catch (error) {
      alert("Failed to update post");
    }
  };

  return (
    <div className="edit-container">
      <h1 className="edit-heading">EDIT POST</h1>
      <form onSubmit={handleUpdate} className="edit-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPost;
