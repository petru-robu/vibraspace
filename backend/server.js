const express = require('express');
const cors = require('cors');
const multer = require('multer');
const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

// ── Database ──────────────────────────────────────────────────────────────────
const db = new Database(path.join(__dirname, 'sessions.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    project_name TEXT NOT NULL,
    description  TEXT,
    form_data    TEXT NOT NULL,
    track_states TEXT NOT NULL,
    audio_file   TEXT,
    created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
// Migrations for existing databases
try { db.exec('ALTER TABLE sessions ADD COLUMN audio_file TEXT'); } catch {}
try { db.exec('ALTER TABLE sessions ADD COLUMN description TEXT'); } catch {}

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: FRONTEND_URL }));

// Multer: hold audio file in memory until we know the session id, then write it
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ['audio/webm', 'audio/ogg', 'audio/wav', 'application/octet-stream'];
    cb(null, allowed.includes(file.mimetype));
  },
});

// ── Routes ────────────────────────────────────────────────────────────────────

// POST /api/sessions — save a new session (multipart/form-data)
// Fields: projectName (string), formData (JSON string), trackStates (JSON string)
// File:   audio (optional, ≤50 MB)
app.post('/api/sessions', upload.single('audio'), (req, res) => {
  const { projectName, projectDescription, formData: formDataRaw, trackStates: trackStatesRaw } = req.body;

  if (typeof projectName !== 'string' || projectName.trim().length === 0) {
    return res.status(400).json({ error: 'projectName is required' });
  }

  const descriptionValue = (typeof projectDescription === 'string' ? projectDescription.trim().slice(0, 1000) : null) || null;

  let formData, trackStates;
  try {
    formData = JSON.parse(formDataRaw);
    trackStates = JSON.parse(trackStatesRaw);
  } catch {
    return res.status(400).json({ error: 'formData and trackStates must be valid JSON strings' });
  }

  if (typeof formData !== 'object' || Array.isArray(formData)) {
    return res.status(400).json({ error: 'formData must be a JSON object' });
  }
  if (typeof trackStates !== 'object' || Array.isArray(trackStates)) {
    return res.status(400).json({ error: 'trackStates must be a JSON object' });
  }

  const stmt = db.prepare(
    'INSERT INTO sessions (project_name, description, form_data, track_states) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(
    projectName.trim().slice(0, 200),
    descriptionValue,
    JSON.stringify(formData),
    JSON.stringify(trackStates)
  );
  const sessionId = result.lastInsertRowid;

  // Write audio file if provided
  let audioFileName = null;
  if (req.file) {
    const ext = req.file.mimetype.includes('ogg') ? 'ogg' : 'webm';
    audioFileName = `session-${sessionId}.${ext}`;
    fs.writeFileSync(path.join(UPLOADS_DIR, audioFileName), req.file.buffer);
    db.prepare('UPDATE sessions SET audio_file = ? WHERE id = ?').run(audioFileName, sessionId);
  }

  res.status(201).json({ id: sessionId, audioFile: audioFileName });
});

// GET /api/sessions — list all sessions (summary)
app.get('/api/sessions', (_req, res) => {
  const rows = db.prepare(
    'SELECT id, project_name, description, form_data, audio_file, created_at FROM sessions ORDER BY created_at DESC'
  ).all();

  res.json(rows.map(r => ({
    id: r.id,
    projectName: r.project_name,
    description: r.description || null,
    formData: JSON.parse(r.form_data),
    hasAudio: !!r.audio_file,
    createdAt: r.created_at,
  })));
});

// GET /api/sessions/:id — get a single session with full track states
app.get('/api/sessions/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });

  const row = db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Session not found' });

  res.json({
    id: row.id,
    projectName: row.project_name,
    description: row.description || null,
    formData: JSON.parse(row.form_data),
    trackStates: JSON.parse(row.track_states),
    hasAudio: !!row.audio_file,
    createdAt: row.created_at,
  });
});

// GET /api/sessions/:id/audio — stream the saved audio file
app.get('/api/sessions/:id/audio', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id) || id <= 0) return res.status(400).json({ error: 'Invalid id' });

  const row = db.prepare('SELECT audio_file FROM sessions WHERE id = ?').get(id);
  if (!row) return res.status(404).json({ error: 'Session not found' });
  if (!row.audio_file) return res.status(404).json({ error: 'No audio for this session' });

  const filePath = path.join(UPLOADS_DIR, row.audio_file);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Audio file missing on disk' });

  res.sendFile(filePath);
});

// ── Static frontend (production build) ───────────────────────────────────────
const DIST_DIR = path.join(__dirname, '..', 'dist');
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (_req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
}

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Vibraspace API → http://localhost:${PORT}`);
});
