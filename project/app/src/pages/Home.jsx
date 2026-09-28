import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostSummary from "../components/PostSummary.jsx";

const API_BASE = "http://localhost:5050/posts";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all posts using native fetch()
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(API_BASE);

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(
        "Could not load posts. Please verify that the Express server is running and connected to MongoDB."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Delete post handler using native fetch() with DELETE method
  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${title}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        throw new Error(`Failed to delete post: ${res.status}`);
      }

      // Remove the deleted post from state
      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== id));
    } catch (err) {
      alert("Error deleting post: " + err.message);
    }
  };

  return (
    <div>
      <section className="hero-box">
        <h1>Dispatches & Notes</h1>
        <p>A quiet corner of the web. Thoughts on software, design, and ideas.</p>
      </section>

      {loading && <div className="status-banner loading">Loading posts...</div>}

      {error && (
        <div className="status-banner error">
          <strong>Connection Notice:</strong> {error}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="status-banner empty">
          <p>No blog posts published yet.</p>
          <p style={{ marginTop: "0.5rem" }}>
            <Link to="/create" style={{ color: "var(--ink)", fontWeight: 600 }}>
              Write your first post →
            </Link>
          </p>
        </div>
      )}

      <div className="posts-list">
        {posts.map((post) => (
          <PostSummary key={post._id} post={post} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
}
