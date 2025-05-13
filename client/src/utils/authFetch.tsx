import Router from "next/router";

interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export const authFetch = async <T = any,>(
  url: string,
  options: FetchOptions = {}
): Promise<T | false> => {
  const token = localStorage.getItem("token");

  if (!token) {
    Router.push("/login");
    return false;
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      return await res.json();
    } else {
      localStorage.removeItem("token");
      return false;
    }
  } catch (err) {
    console.error("Fetch error:", err);
    localStorage.removeItem("token");
    return false;
  }
};
