import { setCookie, getCookies, getCookie, deleteCookie } from "cookies-next";
import SSRCookie from "cookie";

export function __setCookie(key: string, value: string) {
  setCookie(key, value);
}

export function __getCookie(key: string): string | undefined {
  const value = getCookie(key);
  return value?.toString();
}

export function __deleteCookie(key: string) {
  deleteCookie(key);
}

export function __parseSSRCookie(cookie: string) {
  return SSRCookie.parse(cookie);
}
