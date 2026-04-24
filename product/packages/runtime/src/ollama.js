async function fetchWithTimeout(url, options = {}, timeoutMs = 2000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

export async function probeOllama(baseUrl) {
  if (!baseUrl) {
    return {
      status: "disabled",
      checked_at: new Date().toISOString(),
      error: null,
      models: []
    };
  }

  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  try {
    const response = await fetchWithTimeout(`${normalizedBaseUrl}/api/tags`);

    if (!response.ok) {
      return {
        status: "degraded",
        checked_at: new Date().toISOString(),
        error: `HTTP ${response.status}`,
        models: []
      };
    }

    const payload = await response.json();

    return {
      status: "healthy",
      checked_at: new Date().toISOString(),
      error: null,
      models: payload.models ?? []
    };
  } catch (error) {
    return {
      status: "unavailable",
      checked_at: new Date().toISOString(),
      error: error.name === "AbortError" ? "timeout" : error.message,
      models: []
    };
  }
}
