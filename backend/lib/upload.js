const fs = require('fs');
const multer = require('multer');
const { UPLOADS_DIR } = require('./config');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['audio/webm', 'audio/ogg', 'audio/wav', 'application/octet-stream'];
    cb(null, allowed.includes(file.mimetype));
  },
});

module.exports = upload;
