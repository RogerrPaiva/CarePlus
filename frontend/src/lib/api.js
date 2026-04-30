const DEFAULT_API_BASE_URL = "http://localhost:8000";

function getApiBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

  if (!configuredBaseUrl) {
    return DEFAULT_API_BASE_URL;
  }

  return configuredBaseUrl.replace(/\/+$/, "");
}

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
    ...options,
  });

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      typeof data?.detail === "string"
        ? data.detail
        : typeof data?.message === "string"
          ? data.message
          : "Nao foi possivel concluir a solicitacao.";

    throw new Error(message);
  }

  return data;
}

export async function loginUser(credentials) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function registerUser(payload) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function completeUserOnboarding(userId, payload) {
  return apiRequest(`/users/${userId}/onboarding-complete`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getUserPoints(userId) {
  return apiRequest(`/users/${userId}/points`);
}

export async function getUserMission(userId) {
  return apiRequest(`/users/${userId}/mission`);
}

export async function startTokenCollection(payload) {
  return apiRequest("/missions/start-collection", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getUserMundo(userId) {
  return apiRequest(`/users/${userId}/mundo`);
}

export async function updateUserMundo(userId, payload) {
  return apiRequest(`/users/${userId}/mundo`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function completeDailyMission(userId, payload) {
  return apiRequest(`/users/${userId}/missions/daily`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}