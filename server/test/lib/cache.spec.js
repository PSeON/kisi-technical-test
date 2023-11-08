import { Cache, createUniqueCacheKey } from '../../src/lib/cache';

function delay(milliseconds) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), milliseconds);
  });
}

test('Cache stores and retrives a value', async () => {
  const cache = new Cache();
  const key = createUniqueCacheKey();
  const value = { value: 'value' };

  cache.set(key, value, 500);
  const value2 = cache.get(key);

  expect(value2).toBe(value);
});

test('Cache stores and retrives a value after a delay', async () => {
  const cache = new Cache();
  const key = createUniqueCacheKey();
  const value = { value: 'value' };

  cache.set(key, value, 500);
  await delay(100);
  const value2 = cache.get(key);

  expect(value2).toBe(value);
});

test('Cache removes a value', async () => {
  const cache = new Cache();
  const key = createUniqueCacheKey();
  const value = { value: 'value' };

  cache.set(key, value, 200);
  await delay(100);
  cache.delete(key);
  const value2 = cache.get(key);

  expect(value2).toBe(undefined);
});

test("Cache removes a value accordingly to it's lifetime", async () => {
  const cache = new Cache();
  const key = createUniqueCacheKey();
  const value = { value: 'value' };

  cache.set(key, value, 100);
  await delay(200);
  const value2 = cache.get(key);

  expect(value2).toBe(undefined);
});
