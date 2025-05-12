export const authFetch = async <T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T | false> => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem("token");
      return false;
    }

    return await res.json();
  } catch (err) {
    console.error("authFetch error:", err);
    return false;
  }
};
