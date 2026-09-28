import React from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Create from "./pages/Create.jsx";
import Post from "./pages/Post.jsx";
import Archive from "./pages/Archive.jsx";

export default function App() {
  return (
    <div className="container">
      {/* Header */}
      <header className="site-header">
        <Link to="/" className="brand">
          The Dispatch
          <small>Minimal Notes & Essays</small>
        </Link>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Dispatches
          </NavLink>
          <NavLink
            to="/archive"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Archive
          </NavLink>
          <NavLink to="/create" className="nav-create-btn">
            + Write Post
          </NavLink>
        </nav>
      </header>

      {/* Main Content Pages */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/posts/:id" element={<Post />} />
          <Route path="/archive" element={<Archive />} />
        </Routes>
      </main>

      {/* Minimal Footer */}
      <footer
        style={{
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.78rem",
          color: "var(--muted)",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem"
        }}
      >
        <span>Full-Stack React + Express + MongoDB</span>
        <span>Native fetch() • Zero Heavy Boilerplate</span>
      </footer>
    </div>
  );
}
