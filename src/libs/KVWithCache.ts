export type KVWithCache = {
  get: (key: string) => Promise<string|null>;
  deleteCache: (key: string) => Promise<void>;
  getTTL: () => Promise<void>;
};

/**
 * KVをキャッシュを用いて取得するKVWithCacheオブジェクトを返す
 * @param KVNamespace
 * @returns getの他、getTTLとdeleteCacheのFunctionを持つKVWithCacheオブジェクト
 */
export const useKVWithCache = (KV: KVNamespace) : KVWithCache => {
  let _ttl = 120;
  const cache = caches.default;

  // キャッシュにはURL形式にする必要があるため （ただし実在のURLでなくてもよいし、実在するものでも問題ない）
  const cacheprefix = "https://example.com/";
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