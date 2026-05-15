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

### On the VPS — first-time setup

```bash
git clone https://github.com/your-user/vibraspace.git
cd vibraspace
npm install && npm run build
cd backend && npm install
npm install -g pm2
pm2 start server.js --name vibraspace
pm2 save
pm2 startup            # follow the printed command to enable on boot
```

### On the VPS — every deploy after that

```bash
cd vibraspace
git pull
npm install && npm run build
cd backend && npm install
pm2 restart vibraspace
```

### Environment variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` | Port the server listens on |
| `FRONTEND_URL` | `https://composingatmospheres.ro` | Allowed CORS origin |

Set them before starting PM2:
```bash
export PORT=3001
export FRONTEND_URL=https://composingatmospheres.ro/
pm2 restart vibraspace
```

---

## Caddy (HTTPS reverse proxy)

Caddy sits in front of Express and handles HTTPS automatically via Let's Encrypt.

### Install Caddy on the VPS

```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update && sudo apt install caddy
```

### Caddyfile

Create `/etc/caddy/Caddyfile`:

```
composingatmospheres.ro {
    reverse_proxy localhost:3001
}
```

Your DNS A record must point to the VPS IP.

### Start Caddy

```bash
sudo systemctl reload caddy   # apply Caddyfile changes
sudo systemctl enable caddy   # start on boot
sudo systemctl status caddy   # check it's running
```

Caddy automatically obtains and renews the TLS certificate. Your app will be live at `https://composingatmospheres.ro`.

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
