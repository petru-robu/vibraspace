# Vibraspace

Vibraspace is a React and Tone.js application for the **Composing Atmospheres**
architecture workshop. It connects architectural concepts with layered sound:
visitors can explore workshop material, browse student projects, build sound
mixes, and record a short audio session based on selected spatial qualities.

## Features

- Workshop landing pages for theory, Studio 46, and student projects.
- A free mixer for combining all available architectural sound tracks.
- Track controls for playback, volume, stereo pan, and detailed metadata.
- A guided session form that maps architectural choices to a curated mixer.
- 45-second session recording with project metadata.
- Express and SQLite backend for storing sessions and uploaded audio.

## Tech Stack

- React 19
- React Router
- Vite
- Tailwind CSS
- Tone.js
- Express
- SQLite via `better-sqlite3`

## Project Structure

```text
.
|-- src/
|   |-- components/     Shared UI, layout, mixer, and session components
|   |-- data/           Mixer categories and workshop project data
|   |-- hooks/          Audio engine and session recording hooks
|   |-- pages/          Route-level screens
|   |-- routes.js       Route and navigation definitions
|   `-- main.jsx        React entry point
|-- public/
|   |-- audio/          Sound assets used by the mixer
|   |-- img/            Interface and category images
|   `-- projects/       Workshop project images
|-- backend/
|   |-- lib/            Backend config, database, uploads, and repositories
|   |-- routes/         Express API routes
|   |-- server.js       Backend entry point
|   `-- sessions.db     Local SQLite database
`-- vite.config.js
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/mixer` | Free mixer with all tracks |
| `/theory` | Workshop theory |
| `/workshop` | Studio and project overview |
| `/workshop/:id` | Individual workshop project |
| `/session-form` | Guided project/session form |
| `/session-mixer` | Curated mixer and recording flow |

## Local Development

Install frontend dependencies:

```bash
npm install
```

Install backend dependencies:

```bash
cd backend
npm install
```

Start the backend:

```bash
cd backend
npm run dev
```

In a second terminal, start the frontend:

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

The backend runs at `http://localhost:3001`.

The Vite development server proxies `/api` requests to the backend.

## Backend API

### `POST /api/sessions`

Creates a recorded workshop session.

Expected multipart form fields:

| Field | Description |
| --- | --- |
| `projectName` | Required project name |
| `projectDescription` | Optional project description |
| `formData` | JSON object containing selected architectural values |
| `trackStates` | JSON object containing mixer state |
| `audio` | Optional recorded audio file |

### `GET /api/sessions`

Returns all saved sessions without full track state.

### `GET /api/sessions/:id`

Returns one saved session with full form data and track state.

### `GET /api/sessions/:id/audio`

Streams the saved audio file for one session.

## Data Storage

Session metadata is stored in:

```text
backend/sessions.db
```

Uploaded recordings are stored in:

```text
backend/uploads/
```

Useful SQLite query:

```sql
SELECT id, project_name, description, audio_file, created_at
FROM sessions
ORDER BY created_at DESC;
```

## Scripts

Frontend scripts:

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

Backend scripts:

```bash
cd backend
npm run dev
npm start
```

## Environment Variables

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `3001` | Backend server port |
| `FRONTEND_URL` | `http://localhost:5173` | Allowed CORS origin |

## Production

Build the frontend:

```bash
npm run build
```

Start the backend:

```bash
cd backend
npm start
```

When the frontend has been built, the backend serves the generated `dist/`
directory and falls back to `index.html` for client-side routes.

## First-Time Deployment

These steps assume the server already has Node.js, npm, Git, Caddy, and PM2
installed.

Clone the project:

```bash
git clone <repo-url>
cd vibraspace
```

Install and build the frontend:

```bash
npm install
npm run build
```

Install backend dependencies:

```bash
cd backend
npm install
```

Start the backend with PM2:

```bash
pm2 start server.js --name vibraspace
pm2 save
```

Configure Caddy:

```caddyfile
composingatmospheres.ro {
    reverse_proxy localhost:3001
}
```

Reload Caddy after updating the Caddyfile:

```bash
sudo systemctl reload caddy
```

The site should now be available at:

```text
https://composingatmospheres.ro
```

## Update Deployment

Pull the latest code:

```bash
git pull
```

Reinstall dependencies if `package.json` or a lockfile changed:

```bash
npm install
cd backend
npm install
cd ..
```

Rebuild the frontend:

```bash
npm run build
```

Restart the backend process:

```bash
pm2 restart vibraspace
pm2 save
```

Check the running process:

```bash
pm2 status
```

If PM2 shows duplicate `vibraspace` processes, delete the extra process by id
and save the corrected list:

```bash
pm2 delete <id>
pm2 save
```

## Checks

Run these before committing changes:

```bash
npm run lint
npm run build
node --check backend/server.js
```
