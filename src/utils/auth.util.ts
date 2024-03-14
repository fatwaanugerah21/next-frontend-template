import { __setCookie, __getCookie, __parseSSRCookie, __deleteCookie } from "./cookies.util";
import { IncomingMessage } from "http";

export const AUTH_LS_NAME = "token";

export function setBrowserAuthTokenCookie(token: string) {
  __setCookie(AUTH_LS_NAME, token);
}

export function deleteBrowserAuthTokenCookie() {
  __deleteCookie(AUTH_LS_NAME);
}

export function getBrowserAuthTokenFromCookie(): string | undefined {
  return __getCookie(AUTH_LS_NAME);
}

export function getAuthTokenFromSSRContext(req: IncomingMessage & { cookies: Partial<{ [key: string]: string }> }) {
  const cookie = __parseSSRCookie(req.headers.cookie || "");
  return cookie[AUTH_LS_NAME];
}
