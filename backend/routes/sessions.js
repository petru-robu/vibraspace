const express = require('express');
const fs = require('fs');
const path = require('path');
const {
  createSession,
  getSession,
  getSessionAudioFile,
  listSessions,
  setSessionAudio,
} = require('../lib/sessionRepository');
const { UPLOADS_DIR } = require('../lib/config');
const upload = require('../lib/upload');

const router = express.Router();

const parsePositiveId = rawId => {
  const id = parseInt(rawId, 10);
  return Number.isNaN(id) || id <= 0 ? null : id;
};

const parseJsonObject = (value) => {
  const parsed = JSON.parse(value);
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error('Expected a JSON object');
  }
  return parsed;
};

router.post('/', upload.single('audio'), (req, res) => {
  const { projectName, projectDescription, formData: formDataRaw, trackStates: trackStatesRaw } = req.body;

  if (typeof projectName !== 'string' || projectName.trim().length === 0) {
    return res.status(400).json({ error: 'projectName is required' });
  }

  let formData, trackStates;
  try {
    formData = parseJsonObject(formDataRaw);
    trackStates = parseJsonObject(trackStatesRaw);
  } catch {
    return res.status(400).json({ error: 'formData and trackStates must be valid JSON objects' });
  }

  const description = (typeof projectDescription === 'string' ? projectDescription.trim().slice(0, 1000) : null) || null;
  const sessionId = createSession({ projectName, description, formData, trackStates });

  let audioFileName = null;
  if (req.file) {
    const ext = req.file.mimetype.includes('ogg') ? 'ogg' : 'webm';
    audioFileName = `session-${sessionId}.${ext}`;
    fs.writeFileSync(path.join(UPLOADS_DIR, audioFileName), req.file.buffer);
    setSessionAudio(sessionId, audioFileName);
  }

  res.status(201).json({ id: sessionId, audioFile: audioFileName });
});

router.get('/', (_req, res) => {
  res.json(listSessions());
});

router.get('/:id', (req, res) => {
  const id = parsePositiveId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  const session = getSession(id);
  if (!session) return res.status(404).json({ error: 'Session not found' });

  res.json(session);
});

router.get('/:id/audio', (req, res) => {
  const id = parsePositiveId(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid id' });

  const audioFile = getSessionAudioFile(id);
  if (audioFile === undefined) return res.status(404).json({ error: 'Session not found' });
  if (!audioFile) return res.status(404).json({ error: 'No audio for this session' });

  const filePath = path.join(UPLOADS_DIR, audioFile);
  if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Audio file missing on disk' });

  res.sendFile(filePath);
});

module.exports = router;
