# MERN Stack Lab — University Notices Portal

A full-stack MERN application demonstrating React class components, lifecycle data fetching, Express REST API, and MongoDB integration.

## Architecture

- **Database:** MongoDB (via Mongoose)
- **Backend:** Node.js + Express (`backend/server.js`)
- **Frontend:** React + Vite (`frontend/`)

## Project Structure

```
MERN Stack Lab/
├── backend/
│   ├── models/
│   │   └── Notice.js       # Mongoose Schema
│   ├── .env                # MongoDB URI & Port configuration
│   ├── package.json
│   └── server.js           # Express API endpoints
└── frontend/
    ├── src/
    │   ├── components/     # Header, Navbar, NavItem, DropdownMenu, Footer
    │   ├── pages/
    │   │   ├── Home.jsx        # Landing page with live notice preview
    │   │   ├── NoticesPage.jsx # Class component with full CRUD handling
    │   │   └── PageTemplate.jsx
    │   ├── App.jsx         # Routing configuration
    │   ├── navData.js      # Navigation menu structure
    │   └── main.jsx
    ├── vite.config.js      # Proxy configuration (/api -> :5000)
    └── package.json
```

## How to Run

### 1. Backend
```bash
cd backend
npm install
node server.js
```
The server will run on `http://localhost:5000`.

### 2. Frontend
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.
