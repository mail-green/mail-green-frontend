export function setUserId(userId: string) {
  localStorage.setItem("userid", userId);
}

export function getUserId(): string | null {
  return localStorage.getItem("userid");
}

export function removeUserId() {
  localStorage.removeItem("userid");
}

export function isLoggedIn(): boolean {
  return !!getUserId();
}
