type CacheRecord = {
  value: unknown;
  timerId: ReturnType<typeof setTimeout>;
};

type CacheKey = { __brand: 'CacheKey' };

export function createUniqueCacheKey(): CacheKey {
  // Every object instance is unique in terms of comparison.
  // If we need a unique value, then the easiest way to get it is to create an empty object.
  return {} as CacheKey;
}

export class Cache {
  cache = new Map<CacheKey, CacheRecord>();

  set(key: CacheKey, value: unknown, lifetime: number): void {
    const existingRecord = this.cache.get(key);
    if (existingRecord) {
      clearTimeout(existingRecord.timerId);
    }
    this.cache.set(key, {
      value,
      timerId: setTimeout(() => {
        this.cache.delete(key);
      }, lifetime),
    });
  }

  get(key: CacheKey): unknown {
    const cacheRecord = this.cache.get(key);
    return cacheRecord ? cacheRecord.value : undefined;
  }

  delete(key: CacheKey): void {
    const existingRecord = this.cache.get(key);
    if (existingRecord) {
      clearTimeout(existingRecord.timerId);
      this.cache.delete(key);
    }
  }
}
