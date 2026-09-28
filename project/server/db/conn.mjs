import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

if (!connectionString) {
  console.error("Warning: ATLAS_URI not specified in server/.env");
}

const client = new MongoClient(connectionString);

let conn;
let db;

try {
  conn = await client.connect();
  db = conn.db("blog_app");
  console.log("Successfully connected to MongoDB.");
} catch (e) {
  console.error("MongoDB connection error:", e.message);
  console.info("Note: Please make sure your MongoDB instance or Atlas connection string in .env is valid.");
}

export default db;
