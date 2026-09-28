import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams, Link } from "react-router-dom";

const API_BASE = "http://localhost:5050/posts";

export default function Post() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(searchParams.get("edit") === "true");
  const [editForm, setEditForm] = useState({
    title: "",
    author: "",
    category: "",
    tags: "",
    content: ""
  });
  const [saving, setSaving] = useState(false);

  // Fetch individual post using native fetch()
  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/${id}`);

      if (res.status === 404) {
        throw new Error("This post could not be found.");
      }
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      setPost(data);
      setEditForm({
        title: data.title || "",
        author: data.author || "",
        category: data.category || "General",
        tags: Array.isArray(data.tags) ? data.tags.join(", ") : (data.tags || ""),
        content: data.content || ""
      });
    } catch (err) {
      console.error("Error retrieving post:", err);
      setError(err.message || "Failed to load post.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  // Handle edit form inputs
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit edit using native fetch() with PATCH method
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editForm)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${res.status}`);
      }

      // Refresh post data
      await fetchPost();
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating post:", err);
      setError(err.message || "Failed to update post.");
    } finally {
      setSaving(false);
    }
  };

  // Delete post using native fetch() with DELETE method
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${post.title}"?`
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE"
      });

      if (!res.ok) {
        throw new Error(`Failed to delete post: ${res.status}`);
      }

      navigate("/");
    } catch (err) {
      alert("Error deleting post: " + err.message);
    }
  };

  if (loading) {
    return <div className="status-banner loading">Fetching dispatch...</div>;
  }

  if (error && !post) {
    return (
      <div className="status-banner error">
        <strong>Error:</strong> {error}
        <div style={{ marginTop: "1rem" }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "underline" }}>
            ← Return to front page
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = post?.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : "";

  return (
    <article className="post-detail">
      <div style={{ marginBottom: "1rem" }}>
        <Link to="/" style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--muted)", textDecoration: "none" }}>
          ← Back to dispatches
        </Link>
      </div>

      {error && (
        <div className="status-banner error">
          <strong>Notice:</strong> {error}
        </div>
      )}

      {isEditing ? (
        <div className="form-container">
          <h2 className="form-title">Edit Dispatch</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                name="title"
                type="text"
                value={editForm.title}
                onChange={handleEditChange}
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
                  value={editForm.author}
                  onChange={handleEditChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={editForm.category}
                  onChange={handleEditChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tags">Tags (comma separated)</label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={editForm.tags}
                onChange={handleEditChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                name="content"
                rows="12"
                value={editForm.content}
                onChange={handleEditChange}
                required
              />
            </div>

            <div>
              <button type="submit" className="btn-primary" disabled={saving}>
                {saving ? "Saving Changes..." : "Save Updates"}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <header className="post-detail-header">
            <div className="post-card-meta">
              <span className="post-category">{post.category || "General"}</span>
              <span>•</span>
              <time dateTime={post.date}>{formattedDate}</time>
              <span>•</span>
              <span>By {post.author || "Anonymous"}</span>
            </div>

            <h1 className="post-detail-title">{post.title}</h1>

            {post.tags && post.tags.length > 0 && (
              <div className="tags-row">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <section className="post-detail-body">{post.content}</section>

          <footer className="post-footer-actions">
            <button
              type="button"
              className="btn-primary"
              style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}
              onClick={() => setIsEditing(true)}
            >
              Edit Post
            </button>
            <button
              type="button"
              className="btn-secondary"
              style={{ color: "var(--danger)", borderColor: "#fca5a5" }}
              onClick={handleDelete}
            >
              Delete Post
            </button>
          </footer>
        </div>
      )}
    </article>
  );
}
