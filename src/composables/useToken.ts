export function setTokensetToken(
  token: string,
  expirationTimeInMinutes: number,
  role: string
) {
  const expiry: number = new Date().getTime() + expirationTimeInMinutes * 60000;
  localStorage.setItem("authToken", token);
  localStorage.setItem("authTokenExpiry", JSON.stringify(expiry));
  localStorage.setItem("role", role ?? "null");
}

export function isTokenExpired() {
  const tokenExpiry = JSON.parse(localStorage.getItem("authTokenExpiry"));
  if (!tokenExpiry) {
    return true;
  }
  return new Date().getTime() > tokenExpiry;
}

export function handleSessionExpiry(router: any) {
  if (isTokenExpired()) {
    localStorage.clear();
    document.getElementById("expired")?.classList.add("body");
    router.push({ name: "Login" });
  }
}
