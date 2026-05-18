const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const sessionsRouter = require('./routes/sessions');
const { DIST_DIR, FRONTEND_URL, PORT } = require('./lib/config');

const app = express();

app.use(cors({ origin: FRONTEND_URL }));
app.use('/api/sessions', sessionsRouter);

if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (_req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`Vibraspace API -> http://localhost:${PORT}`);
});
