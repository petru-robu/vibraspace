const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '..', 'sessions.db'));

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

// Keep older local databases compatible with the current schema.
try { db.exec('ALTER TABLE sessions ADD COLUMN audio_file TEXT'); } catch {
  // Column already exists.
}
try { db.exec('ALTER TABLE sessions ADD COLUMN description TEXT'); } catch {
  // Column already exists.
}

module.exports = db;
