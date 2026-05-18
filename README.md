# Vibraspace

Vibraspace is a React app for the **Composing Atmospheres** architecture workshop.

The app explains the theory behind the workshop, shows student projects, and lets visitors translate architectural choices into layered sound.

## What The App Contains

- **Home**: introduction and links to the main areas.
- **Theory**: written framework for the relationship between architecture, perception, and sound.
- **Workshop**: description of Studio 46 and a gallery of student projects.
- **Workshop Project**: one project page with image, description, and audio playback.
- **Mixer**: a free audio matrix where anyone can play and combine architectural sound tracks.
- **Session Form**: asks for a project name, description, and architectural parameters.
- **Session Mixer**: creates a curated mixer from the form choices, records 45 seconds, and saves the result.

## Mixer vs Session Mixer

### Mixer

Route: `/mixer`

The regular Mixer is an open playground. It loads all categories from `src/data/columns_data.json` and shows them in a carousel-style grid.

Each track can be:

- played or paused
- adjusted by volume
- adjusted by stereo pan
- opened for more architectural and musical information

This mixer does not save anything. It is mainly for exploration.

### Session Mixer

Route: `/session-mixer`

The Session Mixer is used after the user fills in `/session-form`.

The form sends:

- project name
- optional project description
- one selected value for each architectural category

By default, the Session Mixer only shows tracks that match those selections. The user can switch between:

- **Curated**: only the selected architectural tracks
- **All tracks**: the full mixer data

When the user submits, the app records 45 seconds of the current mix. It sends the project data, track state, and audio file to the backend.

Saved sessions are stored in SQLite, and audio files are stored in `backend/uploads`.

## Project Structure

```text
src/
  components/
    layout/      shared page layout pieces
    mixer/       mixer UI pieces such as tracks, sliders, and modals
    session/     session recording overlay and action bar
  data/          mixer and workshop data
  hooks/         reusable audio and recording logic
  pages/         route-level screens
  routes.js      shared route and nav definitions

backend/
  lib/           config, database, uploads, session repository
  routes/        Express route handlers
  server.js      app setup and startup
```

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

Run the frontend:

```bash
npm run dev
```

Run the backend in another terminal:

```bash
cd backend
npm run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:3001`

The Vite dev server proxies `/api` to `http://localhost:3001`.

## Backend API

### `POST /api/sessions`

Saves a new recorded session.

Expected multipart fields:

- `projectName`
- `projectDescription`
- `formData`
- `trackStates`
- `audio`

### `GET /api/sessions`

Lists saved sessions without full track state.

### `GET /api/sessions/:id`

Returns one saved session with full track state.

### `GET /api/sessions/:id/audio`

Streams the saved audio file for a session.

## Database

SQLite file:

```text
sqlite3 backend/sessions.db
```

Useful query:

```sql
SELECT id, project_name, description, audio_file, created_at
FROM sessions
ORDER BY created_at DESC;
```

## Checks

```bash
npm run lint
npm run build
node --check backend/server.js
```

## Production Notes

Build the frontend:

```bash
npm run build
```

Start the backend:

```bash
cd backend
npm start
```

Environment variables:

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3001` | Backend port |
| `FRONTEND_URL` | `http://localhost:5173` | Allowed CORS origin |
