import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Cookie helpers for registration and auth
export const cookieStore = {
  set(name: string, value: string, days = 7) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
  },
  get(name: string): string | undefined {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return undefined;
  },
  remove(name: string) {
    document.cookie = name + "=; Max-Age=0; path=/";
  }
};

export const REGISTRATION_ID_KEY = 'registrationId';
export const AUTH_TOKEN_KEY = 'authToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';
