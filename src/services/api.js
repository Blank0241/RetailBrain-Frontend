// -----------------------------------------------------------------------------
// RetailBrain API abstraction layer
// -----------------------------------------------------------------------------
// This is the ONLY file in the frontend that talks to the network. Every
// function below now calls the real Express backend instead of resolving
// against local mock data. Call signatures and return shapes are UNCHANGED
// from the mock implementation on purpose — no page or component needed to
// change, except Profile.jsx's handleChangePassword (see note on
// changePassword() below).
//
// Auth: the backend issues an httpOnly session cookie on login/register/demo
// login (see authMiddleware.js / authController.js on the backend). The
// browser attaches it automatically on same-site requests as long as we set
// `credentials: 'include'` on every fetch — there is no token to store or
// attach manually. The `token` field some responses include is returned for
// API-contract completeness but is intentionally unused here.
// -----------------------------------------------------------------------------

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(message, { status, code, details } = {}) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

async function request(path, { method = 'GET', body, params } = {}) {
  let url = `${API_BASE_URL}${path}`;

  if (params) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.set(key, value);
      }
    });
    const qs = query.toString();
    if (qs) url += `?${qs}`;
  }

  const res = await fetch(url, {
    method,
    credentials: 'include', // send/receive the httpOnly session cookie
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  let payload = null;
  try {
    payload = await res.json();
  } catch {
    // no body (e.g. some error responses) — leave payload null
  }

  if (!res.ok || !payload?.success) {
    const message = payload?.error?.message || `Request failed (${res.status})`;
    throw new ApiError(message, {
      status: res.status,
      code: payload?.error?.code,
      details: payload?.error?.details,
    });
  }

  return payload.data;
}

// ===================== AUTH =====================

export async function loginUser({ email, password }) {
  return request('/auth/login', { method: 'POST', body: { email, password } });
}

export async function registerUser({ name, email, password }) {
  return request('/auth/register', { method: 'POST', body: { name, email, password } });
}

export async function logoutUser() {
  return request('/auth/logout', { method: 'POST' });
}

export async function getCurrentUser() {
  return request('/auth/me');
}

export async function loginAsDemoUser() {
  return request('/auth/demo', { method: 'POST' });
}

// ===================== DASHBOARD =====================

export async function getDashboardStats() {
  return request('/analytics/dashboard');
}

// ===================== PREDICTIONS =====================

export async function createPrediction(inputData) {
  return request('/predictions', { method: 'POST', body: { inputData } });
}

export async function getPredictionHistory({ search = '', status = 'All', sortBy = 'newest', page = 1, pageSize = 8 } = {}) {
  return request('/predictions', { params: { search, status, sortBy, page, pageSize } });
}

export async function getPredictionById(id) {
  return request(`/predictions/${id}`);
}

export async function submitActualOutcome(id, actualOutcome) {
  return request(`/predictions/${id}/outcome`, { method: 'PATCH', body: { actualOutcome } });
}

// ===================== ANALYTICS =====================

export async function getAnalytics() {
  return request('/analytics');
}

// ===================== PROFILE =====================

export async function getProfile() {
  return request('/users/me');
}

export async function updateProfile(updates) {
  return request('/users/me', { method: 'PATCH', body: updates });
}

// NOTE: signature changed from changePassword() -> changePassword({ current, next }).
// The old mock version took no arguments and silently ignored the password
// form entirely. The real backend needs the current password to verify
// identity and the new password to set, so this had to accept them. This is
// the one necessary, minimal call-site change — see Profile.jsx's
// handleChangePassword.
export async function changePassword({ current, next }) {
  return request('/users/me/password', {
    method: 'PATCH',
    body: { currentPassword: current, newPassword: next },
  });
}

export { ApiError };
