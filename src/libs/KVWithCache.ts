export type KVWithCache = {
  get: (key: string) => Promise<string|null>;
  deleteCache: (key: string) => Promise<void>;
  getTTL: () => Promise<void>;
};

/**
 * Returns a KVWithCache object that retrieves KV using caching.
 * @param KVNamespace
 * @returns A KVWithCache object that includes functions for get, getTTL, and deleteCache.
 */
export const useKVWithCache = (KV: KVNamespace) : KVWithCache => {
  let _ttl = 120;
  const cache = caches.default;

  // The cacheprefix needs to be in URL format (however, it does not necessarily have to be a valid URL, and there are no issues even if it is a valid one).
  const cacheprefix = "https://expample.tld/";
  return {
    async getTTL() {
      const ttlValue = await this.get("cacheTTL")
      if (Number.isFinite(Number(ttlValue))) {
        _ttl = Number(ttlValue)
      }
    },
    async get(key: string, cacheTTL?: number) {
      const cached = await cache.match(`${cacheprefix}${key}`);
      if (cached && cached.body) {
        return cached.text();
      }
      let value = await KV.get(key);

      if (value) {
        const options: ResponseInit = {};
        if (cacheTTL) {
          options.headers = { "Cache-Control": `max-age=${cacheTTL}` };
        }
        cache.put(key, new Response(value,  options));
      }
      return value;
    },
    async deleteCache(key: string) {
      cache.delete(`${cacheprefix}${key}`);
    },
  };
}