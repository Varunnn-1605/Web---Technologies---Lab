import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE = "http://localhost:5050/posts/archive";

export default function Archive() {
  const [archives, setArchives] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArchive = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_BASE);
        if (!res.ok) {
          throw new Error(`Server returned status ${res.status}`);
        }
        const data = await res.json();
        setArchives(data);
      } catch (err) {
        console.error("Error fetching archive:", err);
        setError("Could not load archive. Please verify server connectivity.");
      } finally {
        setLoading(false);
      }
    };

    fetchArchive();
  }, []);

  return (
    <div>
      <section className="hero-box">
        <h1>Publication Archive</h1>
        <p>Complete historical catalog of all published dispatches and essays.</p>
      </section>

      {loading && <div className="status-banner loading">Loading archives...</div>}

      {error && (
        <div className="status-banner error">
          <strong>Notice:</strong> {error}
        </div>
      )}

      {!loading && !error && archives.length === 0 && (
        <div className="status-banner empty">
          <p>No archives available yet.</p>
          <p style={{ marginTop: "0.5rem" }}>
            <Link to="/create" style={{ color: "var(--ink)", fontWeight: 600 }}>
              Write your first post →
            </Link>
          </p>
        </div>
      )}

      {!loading && archives.length > 0 && (
        <table className="archive-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Dispatch Title</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {archives.map((item) => {
              const formattedDate = item.date
                ? new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit"
                  })
                : "—";

              return (
                <tr key={item._id}>
                  <td className="archive-date">{formattedDate}</td>
                  <td>
                    <Link to={`/posts/${item._id}`} style={{ fontWeight: 500 }}>
                      {item.title}
                    </Link>
                  </td>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.82rem", color: "var(--muted)" }}>
                    {item.category || "General"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
