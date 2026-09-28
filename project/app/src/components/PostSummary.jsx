import React from "react";
import { Link } from "react-router-dom";

export default function PostSummary({ post, onDelete }) {
  // Format date nicely
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      })
    : "Recently";

  // Generate a clean snippet
  const snippet =
    post.content && post.content.length > 170
      ? post.content.slice(0, 170).trim() + "…"
      : post.content;

  return (
    <article className="post-card">
      <div className="post-card-meta">
        <span className="post-category">{post.category || "General"}</span>
        <span>•</span>
        <time dateTime={post.date}>{formattedDate}</time>
        <span>•</span>
        <span>By {post.author || "Anonymous"}</span>
      </div>

      <h2 className="post-card-title">
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h2>

      <p className="post-card-excerpt">{snippet}</p>

      {post.tags && post.tags.length > 0 && (
        <div className="tags-row">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="post-card-actions">
        <Link to={`/posts/${post._id}`}>Read post →</Link>
        <Link to={`/posts/${post._id}?edit=true`}>Edit</Link>
        {onDelete && (
          <button
            type="button"
            className="btn-delete"
            onClick={() => onDelete(post._id, post.title)}
          >
            Delete
          </button>
        )}
      </div>
    </article>
  );
}
