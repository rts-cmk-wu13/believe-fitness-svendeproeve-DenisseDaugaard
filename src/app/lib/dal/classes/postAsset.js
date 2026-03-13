import { getCookiesValues } from "../cookiesStore";

export async function postAsset(url, body) {
  const { token, role } = await getCookiesValues();
  if(!token || role !== "Admin") {
    return {
      ok: false,
      status: 403,
      data: null,
      text: "Unauthorized: You do not have permission to perform this action",
    };
  }

  try {
    const formData = new FormData();

    // append all body fields
    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await fetch(url, {
      method: "POST",
      headers: { // Do not set Content-Type header when sending FormData, the browser will set it with the correct boundary
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      },
      body: formData
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    const data = isJson ? await res.json().catch(() => null) : null;
    const text = !isJson ? await res.text().catch(() => null) : null;

    if (!res.ok) {
      const message =
        (data && (data.message || data.error)) ||
        text ||
        "Something went wrong while updating the data";

      return { ok: false, status: res.status, data, text: message };
    }

    return { ok: true, status: res.status, data, text };

  } catch (error) {
    return {
      ok: false,
      status: 0,
      data: null,
      text: "Server error: Unable to complete the request",
    };
  }
}
