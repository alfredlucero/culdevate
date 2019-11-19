const CULDEVATE_AUTH_TOKEN = "culdevate_auth_token";

export const AuthTokenLocalStorage = {
  getAuthToken: (): string | null => {
    return window.localStorage.getItem(CULDEVATE_AUTH_TOKEN);
  },
  setAuthToken: (authToken: string) => {
    try {
      window.localStorage.setItem(CULDEVATE_AUTH_TOKEN, authToken);
    } catch {
      // If user is in private mode or is out of storage,
      // this may throw so we return null as a fallback
      console.error("Failed to set auth token! Local storage may be full or user may be in private mode!");
    }
  },
  removeAuthToken: () => {
    window.localStorage.removeItem(CULDEVATE_AUTH_TOKEN);
  },
};
