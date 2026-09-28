import "./loadEnvironment.mjs";
import express from "express";
import cors from "cors";
import postsRouter from "./routes/posts.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/posts", postsRouter);

// Health check root route
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Blog REST API is running",
    endpoints: {
      getAllPosts: "GET /posts",
      getArchive: "GET /posts/archive",
      getPost: "GET /posts/:id",
      createPost: "POST /posts",
      updatePost: "PATCH /posts/:id",
      deletePost: "DELETE /posts/:id"
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "An unexpected server error occurred." });
});

// Start listening
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
