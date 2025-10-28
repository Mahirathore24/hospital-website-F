# MediCare+ Frontend (React + Vite)

This is a Vite + React single-page app for the MediCare+ Hospital website. It expects the backend to be available on http://localhost:5000 (the dev server proxies /api to that address).

Quick start:

1. Install dependencies

```bash
cd frontend
npm install
```

2. Run dev server

```bash
npm run dev
```

The app will open on http://localhost:5173 by default and calls to `/api/*` will be proxied to `http://localhost:5000/api/*`.
