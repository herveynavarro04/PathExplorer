export const handleSubmit = async (email, password, setShowError) => {
  try {
    const res = await fetch("http://localhost:8080/api/auth/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.status === 201) {
      const data = await res.json();
      const { accessToken } = data;
      localStorage.setItem("token", accessToken);
      return true;
    } else {
      setShowError(true);
      console.log(`Invalid credentials. Error: ${res.status}`);
      return false;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};
