import { getBrowserAuthTokenFromCookie } from "./auth.util";

export function getPrivateHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getBrowserAuthTokenFromCookie()}`,
  };
}

export function getPublicHeaders() {
  return {
    "Content-Type": "application/json",
  };
}
