# Vibraspace

React + Vite frontend · Express + SQLite backend.

---

## Local Development

```bash
# Frontend (http://localhost:5173)
npm install
npm run dev

# Backend (http://localhost:3001) — separate terminal
cd backend
npm install
npm run dev
```

The Vite dev server proxies `/api` → `http://localhost:3001` automatically.

---

## Production Deployment

### On your local machine — build first

```bash
npm run build          # outputs to dist/
git add dist/ && git commit -m "build" && git push
```

### On the VPS — first-time setup

```bash
git clone https://github.com/your-user/vibraspace.git
cd vibraspace/backend && npm install
npm install -g pm2
pm2 start server.js --name vibraspace
pm2 save
pm2 startup            # follow the printed command to enable on boot
```

### On the VPS — every deploy after that

```bash
cd vibraspace
git pull
cd backend && npm install
pm2 restart vibraspace
```

### Environment variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` | Port the server listens on |
| `FRONTEND_URL` | `http://localhost:5173` | Allowed CORS origin |

Set them in a `.env` file or inline: `PORT=3001 FRONTEND_URL=https://yourdomain.com node server.js`

---

## Database

SQLite file: `backend/sessions.db`

### Open the database

```bash
sqlite3 backend/sessions.db
```

### Useful queries

```sql
-- All sessions (summary)
SELECT id, project_name, description, created_at FROM sessions ORDER BY created_at DESC;

-- Count sessions
SELECT COUNT(*) FROM sessions;

-- Full details of a session (replace 1 with the id)
SELECT * FROM sessions WHERE id = 1;

-- Sessions with audio
SELECT id, project_name, audio_file, created_at FROM sessions WHERE audio_file IS NOT NULL;

-- Sessions without audio
SELECT id, project_name, created_at FROM sessions WHERE audio_file IS NULL;

-- Sessions for a specific project (replace 'MyProject' with the name)
SELECT id, project_name, description, created_at FROM sessions WHERE project_name = 'MyProject';

-- Recent 10 sessions
SELECT id, project_name, created_at FROM sessions ORDER BY created_at DESC LIMIT 10;

-- Delete a session by id
DELETE FROM sessions WHERE id = 1;

-- Show table schema
.schema sessions
```

### Handy sqlite3 CLI commands

```
.tables          -- list all tables
.headers on      -- show column names
.mode column     -- aligned output
.quit            -- exit
```

---

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
