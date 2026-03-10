
// This file contains general functions for making HTTP requests (POST, GET, DELETE)

export async function postJSON(url, body, token) {
  try {
    const res = await fetch(url, {
      method: "POST",
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


  // GET
export async function getJSON(url) {
  try{
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const contentType = res.headers.get("content-type") || "";
    let data = null;
    
    if (!res.ok) {
      return { ok: false, status: res.status, data: null, text: "Something went wrong while fetching data, please try again later" };
    }

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    } 


    return { ok: res.ok, status: res.status, data };
  } catch (error) {
    //console.log("☠️ Error fetching posts:", error.message);
    return {
      ok: false,
      data: null, 
      text: "Network Error: it was not possible to connect to the server, try again later", 
    };
  }
}


// DELETE
export async function deleteJSON(url, token) {
  try {
    const res = await fetch(url, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
       "Authorization": `Bearer ${token}`
      },
    })

    const contentTypeRes = res.headers.get("content-type") || "";
    let data = null;
    let text = null;

    if (contentTypeRes.includes("application/json")) {
      data = await res.json();
    }
   
    return { ok: res.ok, status: res.status, data, text };
  } catch (error) {
    return {
      ok: false,
      data: null, 
      text: "Network Error: it was not possible to connect to the server, try again later" };
  }

  
}