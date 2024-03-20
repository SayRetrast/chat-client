export function logoutAPI(accessToken: string) {
  fetch("http://localhost:3000/auth/logout", {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
}
