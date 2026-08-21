# RetailBrain — Frontend

A modern, production-quality frontend for RetailBrain, a machine-learning powered
retail analytics and prediction platform. This is a **frontend-only** build: all
data is mock/local, and the code is structured so a future Node.js + Express +
MongoDB backend can be wired in without touching page or component code.

## Stack
React 18 · Vite · Tailwind CSS · React Router · Lucide React · Recharts

## Getting started
```bash
npm install
npm run dev      # start local dev server
npm run build    # production build -> dist/
```

## Architecture notes
- **`src/services/api.js`** is the only place that "talks to the backend."
  Every function currently resolves against in-memory mock data with a small
  artificial delay. When the Express API exists, only this file changes —
  pages and components never call fetch() directly.
- **`src/context/AuthContext.jsx`** wraps mock auth (`loginUser`, `registerUser`,
  `logoutUser`, `getCurrentUser`) behind the same interface a real JWT-based
  flow would use.
- **`src/data/mockData.js`** generates realistic Indian-retail mock data and
  mirrors the future MongoDB collections: `users`, `predictions`, `modelMetrics`.
  No passwords, credentials, or secrets are stored or exposed anywhere in the
  frontend.
- **`src/data/mockData.js` → `PREDICTION_FORM_CONFIG`** drives the prediction
  form. Add/remove/reorder ML model input fields by editing this config —
  no JSX changes required.
- Routes are protected via `ProtectedRoute`; unauthenticated users are
  redirected to `/login`.

## Pages
`/` Landing · `/login` · `/register` · `/dashboard` · `/predict` ·
`/history` + `/history/:id` · `/analytics` · `/profile`
