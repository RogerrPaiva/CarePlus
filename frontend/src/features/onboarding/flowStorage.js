const FLOW_STORAGE_KEY = "careplus.onboarding.flow";

function isBrowser() {
  return typeof window !== "undefined";
}

export function readOnboardingFlowContext() {
  if (!isBrowser()) {
    return null;
  }

  try {
    const rawValue = window.sessionStorage.getItem(FLOW_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);

    return parsedValue && typeof parsedValue === "object" ? parsedValue : null;
  } catch {
    return null;
  }
}

export function writeOnboardingFlowContext(context) {
  if (!isBrowser()) {
    return;
  }

  try {
    window.sessionStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(context));
  } catch {
    // Ignora falhas de persistencia local para nao quebrar o fluxo visual.
  }
}

export function clearOnboardingFlowContext() {
  if (!isBrowser()) {
    return;
  }

  try {
    window.sessionStorage.removeItem(FLOW_STORAGE_KEY);
  } catch {
    // Ignora falhas de persistencia local para nao quebrar o fluxo visual.
  }
}

export function hasSavedOnboardingFlowAccess() {
  const storedContext = readOnboardingFlowContext();

  return storedContext?.origin === "login" || storedContext?.origin === "signup";
}
