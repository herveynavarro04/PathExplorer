export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token not found");
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
