const path = require('path');

const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads');
const DIST_DIR = path.join(__dirname, '..', '..', 'dist');

module.exports = {
  DIST_DIR,
  FRONTEND_URL,
  PORT,
  UPLOADS_DIR,
};
