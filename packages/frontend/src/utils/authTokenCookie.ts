import Cookies from "js-cookie";

const AUTH_TOKEN_COOKIE = "culdevate_auth_token";

const AuthTokenCookie = {
  getCookie: () => {
    return Cookies.get(AUTH_TOKEN_COOKIE);
  },
  setCookie: (authToken: string) => {
    // TODO: figure out a sensible expiration/cookie configuration
    return Cookies.set(AUTH_TOKEN_COOKIE, authToken, { expires: 1 });
  },
  deleteCookie: () => {
    // TODO: make sure this works if and when we add path/domain configuration
    Cookies.remove(AUTH_TOKEN_COOKIE);
  },
};

export default AuthTokenCookie;
