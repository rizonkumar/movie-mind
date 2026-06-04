export const getTMDBImageUrl = (path, size = "original") => {
  if (!path) return "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const tmdbUrl = `https://image.tmdb.org/t/p/${size}${cleanPath}`;
  const proxy = import.meta.env.VITE_TMDB_IMAGE_PROXY;

  if (proxy) {
    if (proxy.includes("?url=")) {
      const parts = proxy.split("?url=");
      return `${parts[0]}?url=${encodeURIComponent(tmdbUrl)}`;
    }
    return `${proxy}${tmdbUrl}`;
  }

  return tmdbUrl;
};
