import express from "express";
import { ObjectId } from "mongodb";
import db from "../db/conn.mjs";

const router = express.Router();

// Helper middleware to check database connection
function checkDbConnection(req, res, next) {
  if (!db) {
    return res.status(503).json({
      error: "Database connection not available. Please verify your ATLAS_URI in server/.env."
    });
  }
  next();
}

router.use(checkDbConnection);

// GET /posts - Fetch all posts (sorted newest first)
router.get("/", async (req, res) => {
  try {
    const collection = db.collection("posts");
    const results = await collection
      .find({})
      .sort({ date: -1, _id: -1 })
      .toArray();

    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// GET /posts/archive - Fetch posts summary for archive listing
router.get("/archive", async (req, res) => {
  try {
    const collection = db.collection("posts");
    // Projection to keep archive payload lightweight
    const results = await collection
      .find({}, { projection: { title: 1, author: 1, date: 1, tags: 1, category: 1 } })
      .sort({ date: -1 })
      .toArray();

    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching archive:", err);
    res.status(500).json({ error: "Failed to fetch archive" });
  }
});

// GET /posts/:id - Fetch single post by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid post ID format" });
    }

    const collection = db.collection("posts");
    const query = { _id: new ObjectId(id) };
    const result = await collection.findOne(query);

    if (!result) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: "Failed to retrieve post" });
  }
});

// POST /posts - Create a new post
router.post("/", async (req, res) => {
  try {
    const { title, content, author, tags, category } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newPost = {
      title: title.trim(),
      content: content.trim(),
      author: (author || "Anonymous").trim(),
      tags: Array.isArray(tags)
        ? tags
        : (tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : []),
      category: category ? category.trim() : "General",
      date: new Date().toISOString()
    };

    const collection = db.collection("posts");
    const result = await collection.insertOne(newPost);

    res.status(201).json({
      message: "Post created successfully",
      insertedId: result.insertedId,
      post: { _id: result.insertedId, ...newPost }
    });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ error: "Failed to create post" });
  }
});

// PATCH /posts/:id - Update an existing post
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid post ID format" });
    }

    const { title, content, author, tags, category } = req.body;
    const updateFields = {};

    if (title !== undefined) updateFields.title = title.trim();
    if (content !== undefined) updateFields.content = content.trim();
    if (author !== undefined) updateFields.author = author.trim();
    if (category !== undefined) updateFields.category = category.trim();
    if (tags !== undefined) {
      updateFields.tags = Array.isArray(tags)
        ? tags
        : tags.split(",").map((t) => t.trim()).filter(Boolean);
    }
    updateFields.updatedAt = new Date().toISOString();

    const collection = db.collection("posts");
    const query = { _id: new ObjectId(id) };
    const updates = { $set: updateFields };

    const result = await collection.updateOne(query, updates);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully", result });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ error: "Failed to update post" });
  }
});

// DELETE /posts/:id - Delete a post
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid post ID format" });
    }

    const collection = db.collection("posts");
    const query = { _id: new ObjectId(id) };
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: "Failed to delete post" });
  }
});

export default router;
