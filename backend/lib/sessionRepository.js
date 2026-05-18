const db = require('./db');

const toSessionSummary = row => ({
  id: row.id,
  projectName: row.project_name,
  description: row.description || null,
  formData: JSON.parse(row.form_data),
  hasAudio: !!row.audio_file,
  createdAt: row.created_at,
});

const toSessionDetails = row => ({
  ...toSessionSummary(row),
  trackStates: JSON.parse(row.track_states),
});

function createSession({ projectName, description, formData, trackStates }) {
  const stmt = db.prepare(
    'INSERT INTO sessions (project_name, description, form_data, track_states) VALUES (?, ?, ?, ?)'
  );

  const result = stmt.run(
    projectName.trim().slice(0, 200),
    description,
    JSON.stringify(formData),
    JSON.stringify(trackStates)
  );

  return result.lastInsertRowid;
}

function setSessionAudio(sessionId, audioFileName) {
  db.prepare('UPDATE sessions SET audio_file = ? WHERE id = ?').run(audioFileName, sessionId);
}

function listSessions() {
  return db
    .prepare('SELECT id, project_name, description, form_data, audio_file, created_at FROM sessions ORDER BY created_at DESC')
    .all()
    .map(toSessionSummary);
}

function getSession(id) {
  const row = db.prepare('SELECT * FROM sessions WHERE id = ?').get(id);
  return row ? toSessionDetails(row) : null;
}

function getSessionAudioFile(id) {
  const row = db.prepare('SELECT audio_file FROM sessions WHERE id = ?').get(id);
  return row ? row.audio_file : undefined;
}

module.exports = {
  createSession,
  getSession,
  getSessionAudioFile,
  listSessions,
  setSessionAudio,
};
