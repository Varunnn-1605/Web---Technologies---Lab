# Full-Stack Blog Management Application

A clean, minimalist blog and post management application built with **React**, **Express.js**, and the native **MongoDB Node.js driver**.

---

## 📁 Project Architecture

```
project/ 
├── app/ 
│   ├── index.html 
│   ├── package.json 
│   ├── vite.config.js 
│   └── src/ 
│       ├── main.jsx 
│       ├── App.jsx 
│       ├── index.css 
│       ├── components/ 
│       │   └── PostSummary.jsx 
│       └── pages/ 
│           ├── Home.jsx 
│           ├── Create.jsx 
│           ├── Post.jsx 
│           └── Archive.jsx 
│ 
└── server/ 
    ├── .env 
    ├── package.json 
    ├── index.mjs 
    ├── loadEnvironment.mjs 
    ├── db/ 
    │   └── conn.mjs 
    └── routes/ 
        └── posts.mjs 
```

---

## 🚀 Quick Start Guide

### 1. MongoDB Configuration

Open `server/.env` and specify your MongoDB Atlas connection string (or local MongoDB URI):

```env
PORT=5050
ATLAS_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/blog_app?retryWrites=true&w=majority
```

> **Note**: Replace `<username>`, `<password>`, and `<cluster>` with your actual MongoDB Atlas cluster credentials.

---

### 2. Start the Backend API

Open a terminal in the `server` directory:

```bash
cd server
npm install
npm start
```

The Express REST API will start on:  
`http://localhost:5050`

---

### 3. Start the React Frontend

Open a second terminal in the `app` directory:

```bash
cd app
npm install
npm run dev
```

The React frontend will be accessible at:  
`http://localhost:3000`

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/posts` | Retrieve all posts (sorted newest first) |
| `GET` | `/posts/archive` | Retrieve archive index (title, date, tags, category) |
| `GET` | `/posts/:id` | Retrieve single post by MongoDB `_id` |
| `POST` | `/posts` | Create a new post |
| `PATCH` | `/posts/:id` | Update an existing post by `_id` |
| `DELETE` | `/posts/:id` | Delete a post by `_id` |

### Sample JSON Payload for `POST /posts`:

```json
{
  "title": "On Simplicity in Software",
  "content": "Simplicity is prerequisite for reliability. Building systems with clean boundaries and minimal moving parts leads to software that endures.",
  "author": "Ada Lovelace",
  "category": "Essays",
  "tags": ["architecture", "simplicity", "design"]
}
```

---

## ✨ Features & Highlights

- **Bespoke Handcrafted Design**: Elegant editorial typography, subtle margins, minimal tactile controls—feels authentic and crafted from scratch.
- **Native `fetch()` Calls**: Pure web-standard API communication without external HTTP client dependencies like Axios.
- **Pure MongoDB Driver**: Directly leverages `MongoClient` and `ObjectId` without heavy ODM layers.
- **Complete CRUD Flow**:
  - **Create**: Compose and publish new posts with categories and tags.
  - **Read**: Browse chronological dispatches or the publication archive.
  - **Update**: Edit title, author, category, tags, or content inline.
  - **Delete**: Instant deletion with confirmation alerts.
