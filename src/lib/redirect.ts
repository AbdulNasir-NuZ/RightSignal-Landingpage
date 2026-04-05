const STORAGE_KEY = "rs_intended_path";

export const rememberIntendedPath = (path: string) => {
  try {
    if (path) localStorage.setItem(STORAGE_KEY, path);
  } catch (_) {
    /* ignore storage errors */
  }
};

export const getIntendedPath = (fallback = "/") => {
  try {
    return localStorage.getItem(STORAGE_KEY) || fallback;
  } catch (_) {
    return fallback;
  }
};

export const clearIntendedPath = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (_) {
    /* ignore */
  }
};

export const buildPathFromLocation = (location: { pathname: string; search: string; hash: string }) =>
  `${location.pathname}${location.search}${location.hash}`;
