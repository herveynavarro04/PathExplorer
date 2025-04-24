export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  console.log("Fetching....");

  console.log("Fetching user Data");

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(res);

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
