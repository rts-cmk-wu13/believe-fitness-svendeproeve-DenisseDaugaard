export async function putJSON(url, body, token) {
  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    const data = isJson ? await res.json().catch(() => null) : null;
    const text = !isJson ? await res.text().catch(() => null) : null;

    if (!res.ok) {
      const message = (data && (data.message || data.error)) ||text || "Something went wrong, please try again later";
      return { ok: false, status: res.status, data, text: message };
    }

    return { ok: true, status: res.status, data, text };
  } catch (error) {
    return {
      ok: false,
      data: null,
      text: "Network Error: it was not possible to connect to the server, try again later",
    };
  }
}
