const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Notice = require('./models/Notice');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5173' })); // Allow Vite dev server
app.use(express.json());

// ─── In-memory fallback if MongoDB Atlas credentials are not yet configured ────
let memoryNotices = [
  {
    _id: 'seed-1',
    title: 'Semester Exam Schedule Released',
    body: 'The end-semester examination timetable for all departments has been published on the student portal. Students are advised to check their respective schedules.',
    date: new Date(),
  },
  {
    _id: 'seed-2',
    title: 'Campus Placement Drive — TechCorp India',
    body: 'TechCorp India will be conducting an on-campus placement drive on 10th October. All final-year students are requested to register before 5th October.',
    date: new Date(),
  },
  {
    _id: 'seed-3',
    title: 'Annual Tech Fest — ApexTech 2026',
    body: 'The annual inter-college technical festival ApexTech 2026 will be held from 15–17 November. Registrations are now open for all events.',
    date: new Date(),
  },
];

// ─── MongoDB Connection ────────────────────────────────────────────────────────
const mongoUri = process.env.MONGO_URI;

if (!mongoUri || mongoUri.includes('<db_password>')) {
  console.warn('\n⚠️ NOTICE: Your backend/.env still contains the placeholder <db_password>.');
  console.warn('⚠️ Server will run with in-memory storage so you can test the frontend immediately.');
  console.warn('💡 To connect directly to MongoDB Atlas, replace <db_password> in backend/.env with your database user password and restart the backend.\n');
} else {
  mongoose
    .connect(mongoUri)
    .then(async () => {
      console.log('✅ MongoDB Atlas connected successfully!');

      // Seed sample notices if the collection is empty
      const count = await Notice.countDocuments();
      if (count === 0) {
        await Notice.insertMany([
          {
            title: 'Semester Exam Schedule Released',
            body: 'The end-semester examination timetable for all departments has been published on the student portal. Students are advised to check their respective schedules.',
          },
          {
            title: 'Campus Placement Drive — TechCorp India',
            body: 'TechCorp India will be conducting an on-campus placement drive on 10th October. All final-year students are requested to register before 5th October.',
          },
          {
            title: 'Annual Tech Fest — ApexTech 2026',
            body: 'The annual inter-college technical festival ApexTech 2026 will be held from 15–17 November. Registrations are now open for all events.',
          },
        ]);
        console.log('📌 Sample notices seeded into MongoDB Atlas');
      }
    })
    .catch((err) => {
      console.error('❌ MongoDB Atlas connection error:', err.message);
      console.warn('⚠️ Falling back to in-memory store so server remains functional.\n');
    });
}

// ─── API Routes ────────────────────────────────────────────────────────────────

// GET /api/notices — Fetch all notices (newest first)
app.get('/api/notices', async (req, res) => {
  try {
    if (mongoose.connection.readyState === 1) {
      const notices = await Notice.find().sort({ date: -1 });
      return res.json(notices);
    }
    return res.json(memoryNotices);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// POST /api/notices — Add a new notice
app.post('/api/notices', async (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ message: 'Title and body are required.' });
  }

  try {
    if (mongoose.connection.readyState === 1) {
      const newNotice = new Notice({ title, body });
      const saved = await newNotice.save();
      return res.status(201).json(saved);
    }

    const newNotice = {
      _id: Date.now().toString(),
      title,
      body,
      date: new Date(),
    };
    memoryNotices.unshift(newNotice);
    return res.status(201).json(newNotice);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// ─── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Express Backend running on http://localhost:${PORT}`);
});
