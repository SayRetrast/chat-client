export async function authAPI() {
  const response = await fetch("http://localhost:3000/auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const responseData: { accessToken: string } = await response.json();
  return responseData;
}
