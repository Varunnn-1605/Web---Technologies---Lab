import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const API_BASE = "http://localhost:5050/posts";

export default function Create() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "Essays",
    tags: "",
    content: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit new post using native fetch()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      setError("Please fill out both the title and content.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const res = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${res.status}`);
      }

      const result = await res.json();
      const newId = result.insertedId || (result.post && result.post._id);

      if (newId) {
        navigate(`/posts/${newId}`);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Error creating post:", err);
      setError(err.message || "Failed to publish post.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Compose New Post</h1>

      {error && (
        <div className="status-banner error">
          <strong>Notice:</strong> {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="e.g., On Simplicity in Systems"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              id="author"
              name="author"
              type="text"
              placeholder="Your name or handle"
              value={formData.author}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Essays">Essays</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Field Notes">Field Notes</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags (comma separated)</label>
          <input
            id="tags"
            name="tags"
            type="text"
            placeholder="architecture, nodejs, minimalism"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Post Body *</label>
          <textarea
            id="content"
            name="content"
            rows="10"
            placeholder="Draft your thoughts here..."
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? "Publishing..." : "Publish Post"}
          </button>
          <Link to="/" className="btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
