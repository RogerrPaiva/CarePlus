const AUTH_STORAGE_KEY = "careplus.auth.user";

function isBrowser() {
  return typeof window !== "undefined";
}

export function saveAuthenticatedUser(user) {
  if (!isBrowser()) {
    return;
  }

  if (!user || typeof user !== "object") {
    clearAuthenticatedUser();
    return;
  }

  try {
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } catch {
    // Ignora falhas locais para nao interromper o fluxo principal.
  }
}

export function readAuthenticatedUser() {
  if (!isBrowser()) {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    return parsedValue && typeof parsedValue === "object" ? parsedValue : null;
  } catch {
    return null;
  }
}

export function clearAuthenticatedUser() {
  if (!isBrowser()) {
    return;
  }

  try {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // Ignora falhas locais para nao interromper o fluxo principal.
  }
}
