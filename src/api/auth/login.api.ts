export async function loginAPI(body: { username: string; password: string }) {
  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  const responseData: { accessToken: string } = await response.json();
  return responseData;
}
